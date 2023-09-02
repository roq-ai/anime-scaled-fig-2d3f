import * as yup from 'yup';

export const salesAnalyticsValidationSchema = yup.object().shape({
  sales_count: yup.number().integer().required(),
  store_id: yup.string().nullable(),
  figure_id: yup.string().nullable(),
});
