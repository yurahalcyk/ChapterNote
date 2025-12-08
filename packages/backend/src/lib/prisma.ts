import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './../../prisma-output/generated/prisma/client.ts';
import { DATABASE_URL } from '../config/env.ts';

const connectionString = `${DATABASE_URL}`;

// adapter is the bridge that allows prisma to use a native postgresql driver instead ot the prisma engine connection layer
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };
