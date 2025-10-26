import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const brand = searchParams.get('brand')
  const search = searchParams.get('search')
  const featured = searchParams.get('featured')
  const minPrice = searchParams.get('minPrice')
  const maxPrice = searchParams.get('maxPrice')
  const sort = searchParams.get('sort') || 'newest'

  try {
    const where: any = {
      status: 'ACTIVE',
    }

    if (category) {
      where.category = {
        slug: category,
      }
    }

    if (brand) {
      where.brand = {
        contains: brand,
        mode: 'insensitive',
      }
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { brand: { contains: search, mode: 'insensitive' } },
      ]
    }

    if (featured === 'true') {
      where.featured = true
    }

    if (minPrice || maxPrice) {
      where.price = {}
      if (minPrice) where.price.gte = parseFloat(minPrice)
      if (maxPrice) where.price.lte = parseFloat(maxPrice)
    }

    let orderBy: any = { createdAt: 'desc' }
    
    switch (sort) {
      case 'price-asc':
        orderBy = { price: 'asc' }
        break
      case 'price-desc':
        orderBy = { price: 'desc' }
        break
      case 'name':
        orderBy = { name: 'asc' }
        break
      default:
        orderBy = { createdAt: 'desc' }
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        category: true,
        reviews: {
          select: {
            rating: true,
          },
        },
      },
      orderBy,
    })

    // Calculate average rating for each product
    const productsWithRatings = products.map((product: any) => ({
      ...product,
      averageRating: product.reviews.length > 0
        ? product.reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / product.reviews.length
        : 0,
      reviewCount: product.reviews.length,
      reviews: undefined, // Remove reviews array from response
    }))

    return NextResponse.json({ products: productsWithRatings })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
