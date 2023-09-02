import * as yup from 'yup';

export const collectorProfileValidationSchema = yup.object().shape({
  collection_list: yup.string().nullable(),
  wish_list: yup.string().nullable(),
  user_id: yup.string().nullable(),
});
