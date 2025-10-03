import { SimpleGrid, Skeleton, Center, Image, Box, Stack } from '@mantine/core';

export default function LoadingSpinner() {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="xl">
      {[...Array(8)].map((_, index) => (
        <Box 
          key={index} 
          p="md" 
          style={{ 
            background: 'white', 
            borderRadius: '12px', 
            border: '1px solid #e0e0e0' 
          }}
        >
          <Stack gap="md">
            <Box style={{ position: 'relative', height: 200 }}>
              <Skeleton height={200} radius="md" />
              <Center style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}>
                <Image 
                  src="/images/loader.png" 
                  width={30} 
                  height={30} 
                  alt="Loading..."
                  fit="contain"
                />
              </Center>
            </Box>

            <Box style={{ height: '80px' }}></Box>
          </Stack>
        </Box>
      ))}
    </SimpleGrid>
  );
}