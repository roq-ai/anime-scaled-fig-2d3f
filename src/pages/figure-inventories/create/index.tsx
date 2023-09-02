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

import { createFigureInventory } from 'apiSdk/figure-inventories';
import { figureInventoryValidationSchema } from 'validationSchema/figure-inventories';
import { StoreInterface } from 'interfaces/store';
import { getStores } from 'apiSdk/stores';
import { FigureInventoryInterface } from 'interfaces/figure-inventory';

function FigureInventoryCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: FigureInventoryInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createFigureInventory(values);
      resetForm();
      router.push('/figure-inventories');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<FigureInventoryInterface>({
    initialValues: {
      figure_name: '',
      store_id: (router.query.store_id as string) ?? null,
    },
    validationSchema: figureInventoryValidationSchema,
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
              label: 'Figure Inventories',
              link: '/figure-inventories',
            },
            {
              label: 'Create Figure Inventory',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Figure Inventory
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.figure_name}
            label={'Figure Name'}
            props={{
              name: 'figure_name',
              placeholder: 'Figure Name',
              value: formik.values?.figure_name,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<StoreInterface>
            formik={formik}
            name={'store_id'}
            label={'Select Store'}
            placeholder={'Select Store'}
            fetcher={getStores}
            labelField={'name'}
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
              onClick={() => router.push('/figure-inventories')}
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
    entity: 'figure_inventory',
    operation: AccessOperationEnum.CREATE,
  }),
)(FigureInventoryCreatePage);
