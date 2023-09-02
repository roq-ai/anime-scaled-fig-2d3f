import * as yup from 'yup';

export const figureInventoryValidationSchema = yup.object().shape({
  figure_name: yup.string().required(),
  store_id: yup.string().nullable(),
});
