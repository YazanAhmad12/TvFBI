import { PrismaClient, AssetCondition, AssetSubCategory, AuditStatus, TransferStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Jordan Post database...");

  const emp1 = await prisma.employees.upsert({
    where: { employeeNumber: "88412" },
    update: {},
    create: {
      fullName: "أحمد الفايز",
      employeeNumber: "88412",
      role: "مدير قسم الخدمات البريدية",
      department: "إدارة الخدمات البريدية",
      email: "a.alfaiz@jordanpost.jo",
      phone: "+962-6-461-XXXX",
    },
  });

  const emp2 = await prisma.employees.upsert({
    where: { employeeNumber: "76234" },
    update: {},
    create: {
      fullName: "سارة الخالدي",
      employeeNumber: "76234",
      role: "موظفة استقبال",
      department: "خدمة العملاء",
      email: "s.khalidi@jordanpost.jo",
    },
  });

  const catFurniture = await prisma.assetCategories.upsert({
    where: { name: "Office Furniture" },
    update: {},
    create: { name: "Office Furniture", nameAr: "الأثاث الإداري", icon: "chair-office" },
  });

  const catPostalIt = await prisma.assetCategories.upsert({
    where: { name: "Postal & IT Hardware" },
    update: {},
    create: { name: "Postal & IT Hardware", nameAr: "الأجهزة والتقنيات البريدية", icon: "cpu" },
  });

  const catAmenities = await prisma.assetCategories.upsert({
    where: { name: "General Amenities" },
    update: {},
    create: { name: "General Amenities", nameAr: "المستلزمات العامة", icon: "home" },
  });

  const office1 = await prisma.offices.upsert({
    where: { officeCode: "AMN-HQ-302" },
    update: { employeeId: emp1.id },
    create: {
      officeCode: "AMN-HQ-302",
      officeName: "مكتب الخدمات البريدية الرئيسية - الطابق الثالث",
      branch: "المقر الرئيسي - عمان",
      floor: "الطابق الثالث",
      building: "مبنى البريد الرئيسي",
      city: "عمان",
      employeeId: emp1.id,
    },
  });

  await prisma.assets.upsert({
    where: { serialNumber: "FRN-DSK-2023-0891" },
    update: {},
    create: {
      serialNumber: "FRN-DSK-2023-0891",
      assetTag: "JP-AMN-001",
      qrCode: "JP-AMN-001-QR",
      itemName: "Executive Desk - 180cm",
      itemNameAr: "مكتب تنفيذي ١٨٠ سم",
      condition: AssetCondition.GOOD,
      subCategory: AssetSubCategory.EXECUTIVE_DESK,
      officeId: office1.id,
      categoryId: catFurniture.id,
      employeeId: emp1.id,
      purchasePrice: 850,
      currentValue: 680,
    },
  });

  await prisma.assets.upsert({
    where: { serialNumber: "IT-PC-2024-DL-7821" },
    update: {},
    create: {
      serialNumber: "IT-PC-2024-DL-7821",
      assetTag: "JP-AMN-008",
      qrCode: "JP-AMN-008-QR",
      itemName: "Desktop PC - Dell OptiPlex 7010",
      itemNameAr: "كمبيوتر مكتبي - ديل أوبتيبلكس 7010",
      condition: AssetCondition.GOOD,
      subCategory: AssetSubCategory.DESKTOP_PC,
      officeId: office1.id,
      categoryId: catPostalIt.id,
      employeeId: emp1.id,
      purchasePrice: 1150,
      currentValue: 920,
    },
  });

  await prisma.assets.upsert({
    where: { serialNumber: "AM-AC-2023-DAIKIN-12" },
    update: {},
    create: {
      serialNumber: "AM-AC-2023-DAIKIN-12",
      assetTag: "JP-AMN-018",
      qrCode: "JP-AMN-018-QR",
      itemName: "Split AC Unit - Daikin 12000 BTU",
      itemNameAr: "مكيف سبليت - دايكين ١٢٠٠٠ وحدة حرارية",
      condition: AssetCondition.GOOD,
      subCategory: AssetSubCategory.SPLIT_AC,
      officeId: office1.id,
      categoryId: catAmenities.id,
      purchasePrice: 720,
      currentValue: 576,
    },
  });

  await prisma.inventoryAudits.upsert({
    where: { sessionCode: "AUD-2024-Q4-001" },
    update: {},
    create: {
      sessionCode: "AUD-2024-Q4-001",
      title: "الجرد الربعي الرابع - المقر الرئيسي 2024",
      status: AuditStatus.IN_PROGRESS,
      scheduledDate: new Date("2024-12-01"),
      totalItems: 23,
      varianceCount: 1,
      officeId: office1.id,
      createdBy: "system-admin",
    },
  });

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
