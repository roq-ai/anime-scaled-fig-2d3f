import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createCollectorProfile } from 'apiSdk/collector-profiles';
import { collectorProfileValidationSchema } from 'validationSchema/collector-profiles';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';
import { CollectorProfileInterface } from 'interfaces/collector-profile';

function CollectorProfileCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: CollectorProfileInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createCollectorProfile(values);
      resetForm();
      router.push('/collector-profiles');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<CollectorProfileInterface>({
    initialValues: {
      collection_list: '',
      wish_list: '',
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: collectorProfileValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Collector Profiles',
              link: '/collector-profiles',
            },
            {
              label: 'Create Collector Profile',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Collector Profile
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.collection_list}
            label={'Collection List'}
            props={{
              name: 'collection_list',
              placeholder: 'Collection List',
              value: formik.values?.collection_list,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.wish_list}
            label={'Wish List'}
            props={{
              name: 'wish_list',
              placeholder: 'Wish List',
              value: formik.values?.wish_list,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/collector-profiles')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'collector_profile',
    operation: AccessOperationEnum.CREATE,
  }),
)(CollectorProfileCreatePage);
