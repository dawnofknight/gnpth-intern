import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';

async function getSession(req) {
  return await getServerSession(authOptions);
}

// GET - Ambil surat berdasarkan ID
export async function GET(request, { params }) {
  try {
    const session = await getSession(request);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    
    const surat = await prisma.surat.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            departemen: true
          }
        }
      }
    });

    if (!surat) {
      return NextResponse.json({ error: 'Surat tidak ditemukan' }, { status: 404 });
    }

    // Cek permission - user hanya bisa lihat surat departemennya sendiri (kecuali admin)
    if (session.user.role !== 'admin' && surat.departemen !== session.user.departemen) {
      return NextResponse.json({ error: 'Tidak memiliki akses untuk melihat surat ini' }, { status: 403 });
    }

    return NextResponse.json(surat);
  } catch (error) {
    console.error('Error fetching surat:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT - Update surat
export async function PUT(request, { params }) {
  try {
    const session = await getSession(request);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const body = await request.json();
    const { judul, kategori, departemen, perihal, tujuan, isi, status } = body;
    
    // Cek apakah surat ada dan user berhak mengupdate
    const existingSurat = await prisma.surat.findUnique({
      where: { id }
    });
    
    if (!existingSurat) {
      return NextResponse.json({ error: 'Surat tidak ditemukan' }, { status: 404 });
    }
    
    // Cek permission
    if (session.user.role !== 'admin' && existingSurat.createdBy !== session.user.id) {
      return NextResponse.json({ error: 'Tidak memiliki akses untuk mengupdate surat ini' }, { status: 403 });
    }
    
    const updateData = {};
    if (judul) updateData.judul = judul;
    if (kategori) updateData.kategori = kategori;
    if (departemen) updateData.departemen = departemen;
    if (perihal) updateData.perihal = perihal;
    if (tujuan) updateData.tujuan = tujuan;
    if (isi) updateData.isi = isi;
    if (status) updateData.status = status;
    
    const surat = await prisma.surat.update({
      where: { id },
      data: updateData,
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });
    
    return NextResponse.json(surat);
  } catch (error) {
    console.error('Error updating surat:', error);
    return NextResponse.json({ error: 'Gagal mengupdate surat' }, { status: 500 });
  }
}

// DELETE - Hapus surat
export async function DELETE(request, { params }) {
  try {
    const session = await getSession(request);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    
    // Cek apakah surat ada dan user berhak menghapus
    const existingSurat = await prisma.surat.findUnique({
      where: { id }
    });
    
    if (!existingSurat) {
      return NextResponse.json({ error: 'Surat tidak ditemukan' }, { status: 404 });
    }
    
    // Cek permission
    if (session.user.role !== 'admin' && existingSurat.createdBy !== session.user.id) {
      return NextResponse.json({ error: 'Tidak memiliki akses untuk menghapus surat ini' }, { status: 403 });
    }
    
    await prisma.surat.delete({
      where: { id }
    });
    
    return NextResponse.json({ message: 'Surat berhasil dihapus' });
  } catch (error) {
    console.error('Error deleting surat:', error);
    return NextResponse.json({ error: 'Gagal menghapus surat' }, { status: 500 });
  }
}
