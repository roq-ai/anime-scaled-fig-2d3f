import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import {
  authorizationValidationMiddleware,
  errorHandlerMiddleware,
  notificationHandlerMiddleware,
} from 'server/middlewares';
import { storeValidationSchema } from 'validationSchema/stores';
import { convertQueryToPrismaUtil, getOrderByOptions, parseQueryParams } from 'server/utils';
import { getServerSession } from '@roq/nextjs';
import { GetManyQueryOptions } from 'interfaces';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getStores();
    case 'POST':
      return createStore();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getStores() {
    const {
      limit: _limit,
      offset: _offset,
      order,
      ...query
    } = parseQueryParams(req.query) as Partial<GetManyQueryOptions>;
    const limit = parseInt(_limit as string, 10) || 20;
    const offset = parseInt(_offset as string, 10) || 0;
    const response = await prisma.store
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findManyPaginated({
        ...convertQueryToPrismaUtil(query, 'store'),
        take: limit,
        skip: offset,
        ...(order?.length && {
          orderBy: getOrderByOptions(order),
        }),
      });
    return res.status(200).json(response);
  }

  async function createStore() {
    await storeValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.figure_inventory?.length > 0) {
      const create_figure_inventory = body.figure_inventory;
      body.figure_inventory = {
        create: create_figure_inventory,
      };
    } else {
      delete body.figure_inventory;
    }
    if (body?.sales_analytics?.length > 0) {
      const create_sales_analytics = body.sales_analytics;
      body.sales_analytics = {
        create: create_sales_analytics,
      };
    } else {
      delete body.sales_analytics;
    }
    const data = await prisma.store.create({
      data: body,
    });
    await notificationHandlerMiddleware(req, data.id);
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
