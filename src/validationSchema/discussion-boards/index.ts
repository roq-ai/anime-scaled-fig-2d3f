import * as yup from 'yup';

export const discussionBoardValidationSchema = yup.object().shape({
  topic: yup.string().required(),
  user_id: yup.string().nullable(),
});
