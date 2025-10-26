import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'phones' },
      update: {},
      create: {
        name: 'Phones',
        slug: 'phones',
        description: 'Smartphones and mobile devices',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'laptops' },
      update: {},
      create: {
        name: 'Laptops',
        slug: 'laptops',
        description: 'Laptops and notebooks',
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'gaming' },
      update: {},
      create: {
        name: 'Gaming',
        slug: 'gaming',
        description: 'Gaming consoles and accessories',
        image: 'https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=500',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'accessories' },
      update: {},
      create: {
        name: 'Accessories',
        slug: 'accessories',
        description: 'Tech accessories and peripherals',
        image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500',
      },
    }),
  ])

  console.log('✅ Created categories:', categories.length)

  // Create sample products
  const products = await Promise.all([
    prisma.product.upsert({
      where: { slug: 'iphone-15-pro-max' },
      update: {},
      create: {
        name: 'iPhone 15 Pro Max',
        slug: 'iphone-15-pro-max',
        description: 'The ultimate iPhone with A17 Pro chip, titanium design, and advanced camera system.',
        price: 8500,
        salePrice: 7999,
        brand: 'Apple',
        categoryId: categories[0].id,
        images: [
          'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=800',
          'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800',
        ],
        stock: 15,
        featured: true,
      },
    }),
    prisma.product.upsert({
      where: { slug: 'macbook-pro-m3' },
      update: {},
      create: {
        name: 'MacBook Pro 14" M3 Pro',
        slug: 'macbook-pro-m3',
        description: 'Supercharged by M3 Pro chip with incredible performance and all-day battery life.',
        price: 15000,
        salePrice: 14200,
        brand: 'Apple',
        categoryId: categories[1].id,
        images: [
          'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800',
          'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800',
        ],
        stock: 8,
        featured: true,
      },
    }),
    prisma.product.upsert({
      where: { slug: 'samsung-galaxy-s24-ultra' },
      update: {},
      create: {
        name: 'Samsung Galaxy S24 Ultra',
        slug: 'samsung-galaxy-s24-ultra',
        description: 'Premium flagship with S Pen, 200MP camera, and stunning AMOLED display.',
        price: 7200,
        salePrice: 6800,
        brand: 'Samsung',
        categoryId: categories[0].id,
        images: [
          'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800',
        ],
        stock: 12,
        featured: true,
      },
    }),
    prisma.product.upsert({
      where: { slug: 'ps5-console' },
      update: {},
      create: {
        name: 'PlayStation 5 Console',
        slug: 'ps5-console',
        description: 'Experience lightning-fast loading with ultra-high speed SSD and stunning graphics.',
        price: 4500,
        salePrice: 4200,
        brand: 'Sony',
        categoryId: categories[2].id,
        images: [
          'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800',
        ],
        stock: 20,
        featured: true,
      },
    }),
    prisma.product.upsert({
      where: { slug: 'airpods-pro-2' },
      update: {},
      create: {
        name: 'AirPods Pro (2nd Gen)',
        slug: 'airpods-pro-2',
        description: 'Active Noise Cancellation, Adaptive Audio, and Personalized Spatial Audio.',
        price: 1800,
        salePrice: 1650,
        brand: 'Apple',
        categoryId: categories[3].id,
        images: [
          'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=800',
        ],
        stock: 30,
        featured: false,
      },
    }),
  ])

  console.log('✅ Created products:', products.length)

  // Create admin user
  const bcrypt = require('bcryptjs')
  const hashedPassword = await bcrypt.hash('admin123', 10)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@ddsttstechhive.com' },
    update: {},
    create: {
      email: 'admin@ddsttstechhive.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
    },
  })

  console.log('✅ Created admin user:', admin.email)

  console.log('🎉 Database seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
