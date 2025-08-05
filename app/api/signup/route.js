// import { NextResponse } from "next/server";
// import { db } from "../../../lib/db";
// import bcrypt from 'bcryptjs';
// import z from "zod";


// // define schema for input validation
// const userSchema = z
//     .object({
//         username: z.string().min(1, 'Username is required').max(100),
//         email: z.string().min(1, 'Email is required').email('Invalid email'),
//         password: z 
//             .string()
//             .min(1, 'Password is required')
//             .min(8, 'Password must have at least 8 characters'),
//         confirmPassword: z.string().min(1, 'Need Password confirmation'),
//     })
//     .refine((data) => data.password === data.confirmPassword , {
//         path: ['confirm password'],
//         message: 'do not match',
//     })

// export async function POST(req) {
//     try {
//         const body = await req.json();
//         const { email, username, password } = userSchema.parse(body);

//         // Check email udah ada
//         const existingUserByEmail = await db.user.findUnique({
//             where: { email: email }
//         });
        
//         if (existingUserByEmail) {
//             return NextResponse.json({ 
//                 user: null, 
//                 message: 'Email already taken'
//             }, { status: 409 });
//         }

//         // Check username udah ada
//         const existingUserByUsername = await db.user.findUnique({
//             where: { username: username }
//         });
        
//         if (existingUserByUsername) {
//             return NextResponse.json({ 
//                 user: null, 
//                 message: 'Username already taken'
//             }, { status: 409 });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);

//         const newUser = await db.user.create({
//             data: {
//                 email,
//                 username,
//                 password: hashedPassword
//             }
//         });

//     //     // Remove password from response
//     //     const { password: _, ...userWithoutPassword } = newUser;

//     //     return NextResponse.json({ 
//     //         user: userWithoutPassword, 
//     //         message: 'User created successfully'
//     //     }, { status: 201 });

//     // } catch (error) {
//     //     console.error('Signup error:', error);
//     //     return NextResponse.json({ 
//     //         user: null, 
//     //         message: 'Internal server error' 
//     //     }, { status: 500 });

//         const { password: newUserPassword, ...rest } = newUser;

//         return NextResponse.json({ 
//             user: rest, 
//             message: 'Successfully created'
//         }, { status: 201});
//    // ...existing code...
// } catch (error) {
//     if (error instanceof z.ZodError) {
//         return NextResponse.json({
//             user: null,
//             message: error.errors.map(e => e.message).join(', ')
//         }, { status: 400 });
//     }
//     console.error('error:', error)
//     return NextResponse.json({ 
//         user: null,
//         message: "Something went wrong!, Please Try Again"
//     }, { status: 500});
// }
// }

import { NextResponse } from "next/server";
import { db } from "../../../lib/db";
import bcrypt from 'bcryptjs';


const validateInput = (username, email, password) => {
  const errors = [];

  // Username validation
  if (!username || typeof username !== 'string' || username.trim().length === 0) {
    errors.push('Username is required');
  } else if (username.trim().length < 3) {
    errors.push('Username must be at least 3 characters long');
  } else if (username.trim().length > 50) {
    errors.push('Username must be less than 50 characters');
  }

  // Email validation
  if (!email || typeof email !== 'string' || email.trim().length === 0) {
    errors.push('Email is required');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      errors.push('Invalid email format');
    }
  }

  // Password validation
  if (!password || typeof password !== 'string') {
    errors.push('Password is required');
  } else if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }

  return errors;
};

export async function POST(req) {
    console.log('Signup endpoint hit');

    try {
        const body = await req.json()
        console.log('Request body:', {
            username: body.username,
            email: body.email,  
            hasPassword: !!body.password
        })
        const { username, email, password } = body;

        // Manual validation
    const validationErrors = validateInput(username, email, password);
    if (validationErrors.length > 0) {
      return NextResponse.json({
        user: null,
        message: validationErrors.join(', ')
      }, { status: 400 });
    }

    // Clean the input data
    const cleanUsername = username.trim();
    const cleanEmail = email.trim().toLowerCase();

    console.log('Checking for existing users...');

        // Check if email already exists
        const existingUserByEmail = await db.User.findUnique({
            where: { email:cleanEmail }
        });

        if (existingUserByEmail) {
            console.log('Email already taken:', cleanEmail);
            return NextResponse.json({
                user: null,
                message: 'Email already taken'
            }, { status: 409 });
        }

        // Check if username already exists
        const existingUserByUsername = await db.User.findUnique({
            where: { username: cleanUsername }
        });

        if (existingUserByUsername) {
            console.log('Username already taken:', cleanUsername);
            return NextResponse.json({
                user: null,
                message: 'Username already taken'
            }, { status:409 });
        }

        console.log('Hashing password...');
    const hashedPassword = await bcrypt.hash(password, 12);

    console.log('Creating new user...');
    const newUser = await db.User.create({
      data: {
        email: cleanEmail,
        username: cleanUsername,
        password: hashedPassword,
        role: 'USER' 
      }
    });
    console.log('User created successfully:', {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role
});

        // Remove password from response
     const { password: _removed, ...userWithoutPassword } = newUser;

     return NextResponse.json({
            user: userWithoutPassword,
            message: 'Successfully created'
        }, { status: 201 });

  } catch (error) {
    console.error('Signup error details:', {
      name: error.name,
      message: error.message,
      code: error.code,
      stack: error.stack
    });

    // Handle database connection errors
    if (error.code === 'P1001' || error.message.includes('database server is running')) {
      return NextResponse.json({
        user: null,
        message: 'Database connection failed. Please try again later.'
      }, { status: 503 });
    }

    // Handle database constraint errors
    if (error.code === 'P2002') {
      return NextResponse.json({
        user: null,
        message: 'Username or email already exists'
      }, { status: 409 });
    }

    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      return NextResponse.json({
        user: null,
        message: 'Invalid request format'
      }, { status: 400 });
    }

    // Generic error handler
    return NextResponse.json({
      user: null,
      message: "Something went wrong! Please try again."
    }, { status: 500 });
  }
}