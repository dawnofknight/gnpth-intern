// 'use client'
// // import { signIn, useSession } from 'next-auth/react'
// // import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'

// // export default function SignIn() {
// //   const router = useRouter()
// //   const { data: session, status } = useSession()

 

// //   const handleGoogleSignIn = () => {
// //     signIn('google', { callbackUrl: '/dashboard-test' })
// //   }

// export default function landingPage(){
//   const router = useRouter()
  

//   const handleContinuewithCredential = () => {
//     router.push('auth/signin')
//   }
// }

//   return (
//    <div className="min-h-screen overflow-y-auto">
//       <div className="flex items-center justify-center bg-gradient-to-b from-[#FFF9E5] to-[#496A71] min-h-screen">
//         <div className="grid grid-cols-1 md:grid-cols-2 w-[90%] max-w-6xl rounded-2xl overflow-hidden shadow-lg bg-[#fff]">
//           {/* Kiri - Gambar ilustrasi */}
//           <div className="bg-[#2F4858] flex items-center justify-center p-6">
//             <img
//               src="/images/pictlogin.png"
//               alt="Letter Illustration"
//               className="w-full max-w-[500px]"
//             />
//           </div>

//           {/* Kanan - Teks dan tombol */}
//           <div className="bg-[#FFF9E5] flex flex-col justify-center text-right px-6 py-10">
//             <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-[#2F4858] mb-4 leading-tight break-words">
//               Your digital<br />
//               letter archiving<br />
//               system
//             </h1>
//             <p className="text-lg text-[#2F4858] mb-10 break-words">
//               Easy access to manage your letters anytime
//             </p>
//            <div className="flex justify-center">
//             <button 
//               className="bg-[#5A7D74] hover:bg-[#4b6e65] text-white px-6 py-2 rounded-lg flex items-center gap-2"
//               onClick={handleContinuewithCredential}
//             >
//               <img
//                 src="/images/Google-Symbol.png"
//                 alt="Google logo"
//                 className="w-7 h-4"
//               />
//               Continue with Credential
//             </button>
//           </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )




'use client'
import { useRouter } from 'next/navigation'

export default function LandingPage() {
  const router = useRouter()

  const handleContinueWithCredentials = () => {
    router.push('/signin')
  }

  return (
   <div className="min-h-screen overflow-y-auto">
      <div className="flex items-center justify-center bg-gradient-to-b from-[#FFF9E5] to-[#496A71] min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 w-[90%] max-w-6xl rounded-2xl overflow-hidden shadow-lg bg-[#fff]">
          {/* Kiri - Gambar ilustrasi */}
          <div className="bg-[#2F4858] flex items-center justify-center p-6">
            <img
              src="/images/pictlogin.png"
              alt="Letter Illustration"
              className="w-full max-w-[500px]"
            />
          </div>

          {/* Kanan - Teks dan tombol */}
          <div className="bg-[#FFF9E5] flex flex-col justify-center text-right px-6 py-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-[#2F4858] mb-4 leading-tight break-words">
              Your digital<br />
              letter archiving<br />
              system
            </h1>
            <p className="text-lg text-[#2F4858] mb-10 break-words">
              Easy access to manage your letters anytime
            </p>
           <div className="flex justify-center">
            <button 
              className="bg-[#5A7D74] hover:bg-[#4b6e65] text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
              onClick={handleContinueWithCredentials}
            >
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                />
              </svg>
              Continue with Credentials
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}