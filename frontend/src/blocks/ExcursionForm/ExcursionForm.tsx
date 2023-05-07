import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  Text,
  FormLabel,
  Input,
  Textarea,
  VStack,
} from '@chakra-ui/react';

interface IData {
  title: string;
  city: string;
  theme: string;
  description: string;
  image: FileList;
  date: string;
}

export const ExcursionForm = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IData>();

  const navigate = useNavigate();

  const formSubmitHandler: SubmitHandler<IData> = async (
    data,
  ): Promise<void> => {
    const formData = new FormData();

    Object.entries(data).map(([key, value]) => {
      if (value instanceof FileList) {
        const file = value[0];
        formData.append(key, file, file.name);
      }

      formData.append(key, value);
    });

    await axios.post('http://localhost:4000/excursions', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    navigate('/');
  };

  return (
    <Container maxW="90%">
      <Center>
        <FormControl as="form" onSubmit={handleSubmit(formSubmitHandler)}>
          <VStack spacing="20px" align="stretch">
            <div>
              <FormLabel htmlFor="title" fontSize="20px">
                Title*:
              </FormLabel>
              <Input
                id="title"
                borderWidth="2px"
                borderColor="rgba(0, 0, 0, 0.5)"
                _hover={{ borderColor: 'black' }}
                focusBorderColor="black"
                {...register('title', {
                  required: 'Is required',
                })}
              />
              {errors.title?.message && (
                <Text as="p" color="red">
                  {errors.title.message}
                </Text>
              )}
            </div>
            <div>
              <FormLabel htmlFor="city" fontSize="20px">
                City*:
              </FormLabel>
              <Input
                id="city"
                borderWidth="2px"
                borderColor="rgba(0, 0, 0, 0.5)"
                _hover={{ borderColor: 'black' }}
                focusBorderColor="black"
                {...register('city', {
                  required: 'Is Required',
                  minLength: {
                    value: 2,
                    message: 'Min 2 chars',
                  },
                })}
              />
              {errors.city?.message && (
                <Text as="p" color="red">
                  {errors.city.message}
                </Text>
              )}
            </div>
            <div>
              <FormLabel htmlFor="theme" fontSize="20px">
                Theme*:
              </FormLabel>
              <Input
                id="theme"
                borderWidth="2px"
                borderColor="rgba(0, 0, 0, 0.5)"
                _hover={{ borderColor: 'black' }}
                focusBorderColor="black"
                {...register('theme', {
                  required: 'Is required',
                })}
              />
              {errors.theme?.message && (
                <Text as="p" color="red">
                  {errors.theme.message}
                </Text>
              )}
            </div>
            <div>
              <FormLabel htmlFor="description" fontSize="20px">
                Description*:
              </FormLabel>
              <Textarea
                id="description"
                borderWidth="2px"
                borderColor="rgba(0, 0, 0, 0.5)"
                _hover={{ borderColor: 'black' }}
                focusBorderColor="black"
                {...register('description', {
                  required: 'Is required',
                })}
              />
              {errors.description?.message && (
                <Text as="p" color="red">
                  {errors.description.message}
                </Text>
              )}
            </div>
            <div>
              <FormLabel htmlFor="date" fontSize="20px">
                Date*:
              </FormLabel>
              <Input
                type="date"
                id="date"
                borderWidth="2px"
                borderColor="rgba(0, 0, 0, 0.5)"
                _hover={{ borderColor: 'black' }}
                focusBorderColor="black"
                {...register('date', {
                  required: 'Is required',
                })}
              />
              {errors.date?.message && (
                <Text as="p" color="red">
                  {errors.date.message}
                </Text>
              )}
            </div>
            <div>
              <FormLabel htmlFor="image" fontSize="20px">
                Image*:
              </FormLabel>
              <Box
                display="flex"
                flexDirection="column"
                border="2px solid rgba(0, 0, 0, 0.5)"
                borderRadius="10px"
                p="10px"
                transition="0.2s"
                _hover={{ borderColor: 'black' }}
              >
                <input
                  width="100%"
                  type="file"
                  id="image"
                  accept="image/*"
                  {...register('image', {
                    required: 'Is required',
                  })}
                />
              </Box>
              {errors.image?.message && (
                <Text as="p" color="red">
                  {errors.image.message}
                </Text>
              )}
            </div>
            <Button type="submit" border="2px solid black">
              Submit
            </Button>
          </VStack>
        </FormControl>
      </Center>
    </Container>
  );
};
