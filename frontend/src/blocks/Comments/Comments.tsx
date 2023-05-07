import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  Button,
  Textarea,
  Image,
} from '@chakra-ui/react';

import { config } from '../../../config';

interface IForm {
  grade: number;
  body: string;
  image: FileList;
}

interface IComment {
  id: number;
  grade: number;
  body: string;
  excursionId: number;
  imageUrl: string;
}

export const Comments = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [comments, setComments] = useState<IComment[]>([]);
  const { id } = useParams();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IForm>();

  const formSubmitHandler: SubmitHandler<IForm> = async (data) => {
    const formData = new FormData();

    Object.entries(data).map(([key, value]) => {
      if (value instanceof FileList) {
        const file = value[0];
        formData.append(key, file, file.name);
      }

      formData.append(key, value);
    });

    if (id) {
      formData.append('excursionId', id);
    }

    await axios.post(`${config.serverUrl}/comments`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    window.location.reload();
  };

  useEffect((): void => {
    axios
      .get(`${config.serverUrl}/excursions/${id}/comments`)
      .then((response) => {
        setIsLoading(false);
        setComments(response.data);
      })
      .catch((error) => console.error(error));
  }, [id]);

  const commentElements = comments.map((comment) => (
    <Box
      key={comment.id}
      w="100%"
      border="2px solid black"
      p="10px"
      borderRadius="5px"
    >
      <Image src={`${config.serverUrl}/${comment.imageUrl}`} mb="10px" />
      <Text as="p">Grade: {comment.grade}</Text>
      <Text as="p">Body: {comment.body}</Text>
    </Box>
  ));

  return (
    <Container maxW="90%">
      <FormControl
        onSubmit={handleSubmit(formSubmitHandler)}
        as="form"
        border="2px solid black"
        p="10px"
        mb="20px"
        borderRadius="5px"
      >
        <VStack spacing="20px" align="stretch">
          <Box>
            <Text fontWeight={700} fontSize="20px">
              Comment Form
            </Text>
          </Box>
          <Box>
            <FormLabel htmlFor="grade">Grade*: (min 1, max 5)</FormLabel>
            <Input
              id="grade"
              type="number"
              border="2px solid black"
              min={1}
              max={5}
              _hover={{ border: '2px solid black' }}
              {...register('grade', {
                required: 'Is required',
                min: {
                  value: 1,
                  message: 'Min value is 1',
                },
                max: {
                  value: 5,
                  message: 'Max value is 5',
                },
              })}
            />
            <Text color="red">{errors?.grade?.message}</Text>
          </Box>
          <Box>
            <FormLabel htmlFor="body">Body*:</FormLabel>
            <Textarea
              id="body"
              border="2px solid black"
              _hover={{ border: '2px solid black' }}
              {...register('body', {
                required: 'Is required',
              })}
            />
            <Text color="red">{errors?.body?.message}</Text>
          </Box>
          <Box>
            <FormLabel htmlFor="image">Image*:</FormLabel>
            <Box border="2px solid black" p="10px" borderRadius="5px">
              <input
                id="image"
                type="file"
                {...register('image', {
                  required: 'Is required',
                })}
              />
            </Box>
            <Text color="red">{errors?.image?.message}</Text>
          </Box>
          <Button border="2px solid black" type="submit">
            Send
          </Button>
        </VStack>
      </FormControl>

      <Box
        display={isLoading || comments.length !== 0 ? 'block' : 'none'}
        border="2px solid black"
        borderRadius="5px"
        p="10px"
      >
        <VStack>
          {isLoading ? (
            <Text as="p" fontSize="20px">
              Loading comments...
            </Text>
          ) : (
            <>{commentElements}</>
          )}
        </VStack>
      </Box>
    </Container>
  );
};
