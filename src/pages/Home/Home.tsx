import { Container, Title, SimpleGrid, Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import ProductCard from '../../components/ProductCard/ProductCard';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { useProducts } from '../../hooks/useProducts';
import classes from './Home.module.css';

export default function Home() {
  const { products, loading, error } = useProducts();

  return (
    <Container size="xl" py="xl">
      <Title order={1} ta="left" mb="xl" className={classes.title}>
       Catalog
      </Title>

      {error && (
        <Alert 
          icon={<IconAlertCircle size={16} />} 
          title="Ошибка" 
          color="red" 
          variant="filled"
          mb="xl"
        >
          Не удалось загрузить продукты: {error}
        </Alert>
      )}

      {loading ? (
        <LoadingSpinner />
      ) : (
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="xl">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
}