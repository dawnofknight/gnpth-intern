import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import { generateNomorSurat } from '../../../utils/generateNomorSurat';

async function getSession(req) {
  return await getServerSession(authOptions);
}

// GET - Ambil daftar surat dengan filter
export async function GET(request) {
  try {
    const session = await getSession(request);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const bulan = searchParams.get('bulan');
    const tahun = searchParams.get('tahun');
    const departemen = searchParams.get('departemen');
    const kategori = searchParams.get('kategori');
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    const where = {};
    
    // Filter berdasarkan departemen user (kecuali admin)
    if (session.user.role !== 'admin') {
      where.departemen = session.user.departemen;
    }
    
    // Filter tambahan
    if (bulan && tahun) {
      const startDate = new Date(tahun, bulan - 1, 1);
      const endDate = new Date(tahun, bulan, 0, 23, 59, 59);
      where.tanggal = {
        gte: startDate,
        lte: endDate
      };
    }
    
    if (departemen) where.departemen = departemen;
    if (kategori) where.kategori = kategori;
    if (status) where.status = status;
    
    const skip = (page - 1) * limit;
    
    const [surat, total] = await Promise.all([
      prisma.surat.findMany({
        where,
        include: {
          user: {
            select: {
              name: true,
              email: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip,
        take: limit
      }),
      prisma.surat.count({ where })
    ]);
    
    return NextResponse.json({
      surat,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching surat:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Buat surat baru
export async function POST(request) {
  try {
    const session = await getSession(request);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { judul, kategori, departemen, perihal, tujuan, isi } = body;
    
    // Validasi input
    if (!judul || !kategori || !departemen || !perihal || !tujuan || !isi) {
      return NextResponse.json({ error: 'Semua field wajib diisi' }, { status: 400 });
    }
    
    // Generate nomor surat otomatis
    const nomorSurat = await generateNomorSurat(kategori, departemen);
    
    const surat = await prisma.surat.create({
      data: {
        nomorSurat,
        judul,
        kategori,
        departemen,
        perihal,
        tujuan,
        isi,
        createdBy: session.user.id,
        status: 'draft'
      },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });
    
    return NextResponse.json(surat, { status: 201 });
  } catch (error) {
    console.error('Error creating surat:', error);
    return NextResponse.json({ error: 'Gagal membuat surat' }, { status: 500 });
  }
}
