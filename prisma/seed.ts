import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';


enum planType {
  FREE = 'FREE',
  BASIC = 'BASIC',
  ADVANCED = 'ADVANCED',
  PREMIUM = 'PREMIUM',
}

enum subscriptionStatus {
  ACTIVE = 'ACTIVE',
  CANCELED = 'CANCELED',
  EXPIRED = 'EXPIRED',
  INACTIVE = 'INACTIVE',
}
// Verificar se DATABASE_URL está definida com notação de índice
if (!process.env['DATABASE_URL']) {
  console.warn('AVISO: DATABASE_URL não está definida. Usando configuração padrão.');
}

console.log('Conectando ao banco de dados usando a URL:');
console.log(`${process.env['DATABASE_URL']?.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@') || '(URL não definida)'}`);

// Inicializar o PrismaClient com a URL explícita
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env['DATABASE_URL'] || 'postgresql://simplesgestor:senhasegura123@localhost:5432/simplesgestor',
    },
  },
  log: ['query', 'info', 'warn', 'error'],
});

async function main() {
  // Testar conexão com o banco de dados
  try {
    await prisma.$connect();
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    process.exit(1);
  }
  console.log('Iniciando seed do banco de dados...');

  // Limpar dados existentes
  console.log('Removendo dados existentes...');
  await prisma.subscription.deleteMany();
  await prisma.user.deleteMany();
  await prisma.plan.deleteMany();

  console.log('Criando planos...');
  // Criar planos
  const freePlan = await prisma.plan.create({
    data: {
      name: planType.FREE,
      price: 0.00,
      features: {
        maxProjects: 1,
        maxUsers: 1,
        storage: "1GB",
        support: "email"
      },
      isActive: true
    }
  });

  const basicPlan = await prisma.plan.create({
    data: {
      name: planType.BASIC,
      price: 9.99,
      features: {
        maxProjects: 5,
        maxUsers: 3,
        storage: "5GB",
        support: "email"
      },
      isActive: true
    }
  });

  const advancedPlan = await prisma.plan.create({
    data: {
      name: planType.ADVANCED,
      price: 19.99,
      features: {
        maxProjects: 10,
        maxUsers: 10,
        storage: "20GB",
        support: "priority"
      },
      isActive: true
    }
  });

  const premiumPlan = await prisma.plan.create({
    data: {
      name: planType.PREMIUM,
      price: 49.99,
      features: {
        maxProjects: -1,
        maxUsers: -1,
        storage: "100GB",
        support: "24/7"
      },
      isActive: true
    }
  });

  console.log('Criando usuários e assinaturas...');
  // Senha comum para todos os usuários
  const passwordHash = await bcrypt.hash('senha123', 10);

  // Criar usuários com planos e assinaturas
  await prisma.user.create({
    data: {
      email: 'usuario.free@exemplo.com',
      name: 'Usuário Free',
      passwordHash,
      plan: { connect: { id: freePlan.id } },
      subscriptions: {
        create: {
          status: subscriptionStatus.ACTIVE,
          startDate: new Date(),
        }
      }
    }
  });

  await prisma.user.create({
    data: {
      email: 'usuario.basic@exemplo.com',
      name: 'Usuário Basic',
      passwordHash,
      plan: { connect: { id: basicPlan.id } },
      subscriptions: {
        create: {
          status: subscriptionStatus.ACTIVE,
          startDate: new Date(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 dias
        }
      }
    }
  });

  await prisma.user.create({
    data: {
      email: 'usuario.advanced@exemplo.com',
      name: 'Usuário Advanced',
      passwordHash,
      plan: { connect: { id: advancedPlan.id } },
      subscriptions: {
        create: {
          status: subscriptionStatus.ACTIVE,
          startDate: new Date(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 dias
        }
      }
    }
  });

  await prisma.user.create({
    data: {
      email: 'usuario.premium@exemplo.com',
      name: 'Usuário Premium',
      passwordHash,
      plan: { connect: { id: premiumPlan.id } },
      subscriptions: {
        create: {
          status: subscriptionStatus.ACTIVE,
          startDate: new Date(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 dias
        }
      }
    }
  });

  console.log('Dados de teste criados com sucesso!');
}

main()
  .catch((e) => {
    console.error('Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
