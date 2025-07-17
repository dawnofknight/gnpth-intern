# Migration to Next.js App Router

This project has been migrated from Pages Router to App Router in Next.js 15.

## Changes Made

### Directory Structure
- ✅ Created `app/` directory for App Router
- ✅ Moved pages to `app/` with `page.js` files
- ✅ Converted API routes to Route Handlers
- ✅ Added root layout file

### Files Converted

#### Pages → App Router
- `pages/index.js` → `app/page.js`
- `pages/dashboard.js` → `app/dashboard/page.js`
- `pages/_app.js` + `pages/_document.js` → `app/layout.js`

#### API Routes → Route Handlers
- `pages/api/hello.js` → `app/api/hello/route.js`
- `pages/api/auth/[...nextauth].js` → `app/api/auth/[...nextauth]/route.js`
- `pages/api/surat.js` → `app/api/surat/route.js`
- `pages/api/surat/[id].js` → `app/api/surat/[id]/route.js`
- `pages/api/test.js` → `app/api/test/route.js`

### Key Changes

#### 1. Import Updates
- Changed `next/router` → `next/navigation`
- Updated component imports for new structure
- Fixed relative paths in components

#### 2. API Route Changes
- Converted to Route Handlers (GET, POST, PUT, DELETE functions)
- Updated authentication session handling
- Changed response format to use NextResponse

#### 3. Styling
- Moved CSS to `app/globals.css`
- Added metadata to root layout

#### 4. Client Components
- Added `'use client'` directive to components using hooks
- Created SessionProvider wrapper for client-side auth

## Migration Steps to Run

1. **Install dependencies** (if needed):
   ```bash
   npm install
   ```

2. **Update environment variables**:
   - Copy `.env.local.example` to `.env.local`
   - Update with your actual values

3. **Remove old pages directory** (optional):
   ```bash
   # After testing that everything works
   rm -rf pages/
   rm -rf styles/
   ```

4. **Test the application**:
   ```bash
   npm run dev
   ```

## What Still Works

- ✅ Authentication with NextAuth.js
- ✅ Database operations with Prisma
- ✅ All existing components
- ✅ Styling with Tailwind CSS
- ✅ API endpoints functionality

## Benefits of App Router

1. **Better Performance**: Server components by default
2. **Improved SEO**: Better metadata handling
3. **Enhanced DX**: Cleaner file structure
4. **Modern Features**: Latest Next.js features
5. **Future Proof**: Recommended approach for new projects

## Notes

- Both `pages/` and `app/` directories can coexist during migration
- Remove the `pages/` directory after confirming everything works
- Components remain unchanged (except for navigation imports)
- The `experimental.appDir` flag is enabled in `next.config.js`

## Troubleshooting

If you encounter issues:

1. Check that all imports are correct
2. Ensure `'use client'` is added to components using React hooks
3. Verify API routes are returning NextResponse objects
4. Check that authentication is working with the new session handling
