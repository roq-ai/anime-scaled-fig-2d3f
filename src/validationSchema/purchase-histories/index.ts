import * as yup from 'yup';

export const purchaseHistoryValidationSchema = yup.object().shape({
  purchase_date: yup.date().required(),
  user_id: yup.string().nullable(),
  figure_id: yup.string().nullable(),
});
