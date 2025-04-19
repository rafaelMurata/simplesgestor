-- Script para criar dados de teste no PostgreSQL

-- Limpar dados existentes (opcional)
TRUNCATE TABLE "subscriptions" CASCADE;
TRUNCATE TABLE "users" CASCADE;
TRUNCATE TABLE "plans" CASCADE;

-- Inserir planos
INSERT INTO "plans" (id, name, price, features, "isActive", "createdAt", "updatedAt")
VALUES
  ('11111111-1111-1111-1111-111111111111', 'FREE', 0.00, '{"maxProjects": 1, "maxUsers": 1, "storage": "1GB", "support": "email"}', true, NOW(), NOW()),
  ('22222222-2222-2222-2222-222222222222', 'BASIC', 9.99, '{"maxProjects": 5, "maxUsers": 3, "storage": "5GB", "support": "email"}', true, NOW(), NOW()),
  ('33333333-3333-3333-3333-333333333333', 'ADVANCED', 19.99, '{"maxProjects": 10, "maxUsers": 10, "storage": "20GB", "support": "priority"}', true, NOW(), NOW()),
  ('44444444-4444-4444-4444-444444444444', 'PREMIUM', 49.99, '{"maxProjects": -1, "maxUsers": -1, "storage": "100GB", "support": "24/7"}', true, NOW(), NOW());

-- Inserir usuários com senha: "senha123" (hash gerado com bcrypt)
INSERT INTO "users" (id, email, name, "passwordHash", "createdAt", "updatedAt", "planId")
VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'usuario.free@exemplo.com', 'Usuário Free', '$2a$10$OsR3yJJGN8cc.1JAXAI8JO9OcEDTE.g2EL3q/NQCz/HDfvU/aCfky', NOW(), NOW(), '11111111-1111-1111-1111-111111111111'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'usuario.basic@exemplo.com', 'Usuário Basic', '$2a$10$OsR3yJJGN8cc.1JAXAI8JO9OcEDTE.g2EL3q/NQCz/HDfvU/aCfky', NOW(), NOW(), '22222222-2222-2222-2222-222222222222'),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'usuario.advanced@exemplo.com', 'Usuário Advanced', '$2a$10$OsR3yJJGN8cc.1JAXAI8JO9OcEDTE.g2EL3q/NQCz/HDfvU/aCfky', NOW(), NOW(), '33333333-3333-3333-3333-333333333333'),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'usuario.premium@exemplo.com', 'Usuário Premium', '$2a$10$OsR3yJJGN8cc.1JAXAI8JO9OcEDTE.g2EL3q/NQCz/HDfvU/aCfky', NOW(), NOW(), '44444444-4444-4444-4444-444444444444');

-- Inserir assinaturas
INSERT INTO "subscriptions" (id, "userId", status, "startDate", "endDate", "createdAt", "updatedAt")
VALUES
  ('55555555-5555-5555-5555-555555555555', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'ACTIVE', NOW(), NULL, NOW(), NOW()),
  ('66666666-6666-6666-6666-666666666666', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'ACTIVE', NOW(), NOW() + INTERVAL '30 days', NOW(), NOW()),
  ('77777777-7777-7777-7777-777777777777', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'ACTIVE', NOW(), NOW() + INTERVAL '30 days', NOW(), NOW()),
  ('88888888-8888-8888-8888-888888888888', 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'ACTIVE', NOW(), NOW() + INTERVAL '30 days', NOW(), NOW());
