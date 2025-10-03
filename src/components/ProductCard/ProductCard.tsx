import { Card, Image, Text, Group, Button, NumberInput, ActionIcon, rem, Box, Flex } from '@mantine/core';
import { IconPlus, IconMinus, IconShoppingCart } from '@tabler/icons-react';
import { useState } from 'react';
import type { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import classes from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1);
  };

  const increment = () => setQuantity(q => q + 1);
  const decrement = () => setQuantity(q => Math.max(1, q - 1));

  const fallbackImage = 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=280&h=200&fit=crop&auto=format';

const getProductNameAndWeight = (name: string) => {
const weightMatch = name.match(/(\d+(?:\/|\.)?\d*\s*(kg|g|lb))/i);
  
  if (weightMatch) {
    const productName = name.replace(weightMatch[0], '').trim();
    const cleanedProductName = productName.replace(/[-–—\s]+$/, '').trim();
    const weight = weightMatch[0];
    return { productName: cleanedProductName, weight };
  }
  
  return { productName: name.replace(/[-–—\s]+$/, '').trim(), weight: '1 kg' };
};
  const { productName, weight } = getProductNameAndWeight(product.name);

  return (
    <Card className={classes.card}
    radius="xl">
   
      <Box className={classes.imageContainer}>
        <Image
          src={imageError ? fallbackImage : product.image}
          height={140}
          alt={product.name}
          className={classes.image}
          fit="cover"
          radius="md"
          onError={() => setImageError(true)}
          fallbackSrc={fallbackImage}
        />
      </Box>

 
    <Flex justify="space-between" align="center" className={classes.firstRow}>
        <div>
          <Text style={{ 
            fontWeight: 700, 
            fontSize: '16px', 
            color: 'var(--mantine-color-dark-7)',
            marginBottom: '2px'
           }}>
           {productName}
           {' '}
           <Text 
             span 
             style={{ 
               fontWeight: 200, 
               fontSize: '12px', 
               color: 'var(--mantine-color-gray-6)'
             }}
           >
             {weight}
           </Text>
          </Text>
        </div>
        
<Group className={classes.quantityGroup} gap={0}>
  <ActionIcon 
    variant="light"
    size="14px"
    onClick={decrement}
    disabled={quantity <= 1}
    styles={{
      root: {
        backgroundColor: 'var(--mantine-color-gray-2)',
        border: '1px solid var(--mantine-color-gray-4)',
        color: 'var(--mantine-color-gray-7)',
        borderRadius: '4px',
        width: '24px',
        height: '24px',
        '&:hover:not(:disabled)': {
          backgroundColor: 'var(--mantine-color-gray-3)'
        },
        '&:disabled': {
          backgroundColor: 'var(--mantine-color-gray-1)',
          color: 'var(--mantine-color-gray-4)'
        }
      }
    }}
  >
    <IconMinus style={{ width: rem(12), height: rem(12) }} />
  </ActionIcon>
  
  <NumberInput
    value={quantity}
    onChange={(value) => setQuantity(Number(value))}
    min={1}
    max={100}
    hideControls
    size="xs"
    styles={{
      root: { width: '30px', margin: '0 2px' },
      input: {
        textAlign: 'center',
        fontWeight: 600,
        height: '24px',
        minHeight: '24px',
        fontSize: '12px'
      }
    }}
  />
  
  <ActionIcon 
    variant="light"
    size="14px"
    onClick={increment}
    styles={{
      root: {
        backgroundColor: 'var(--mantine-color-gray-2)',
        border: '1px solid var(--mantine-color-gray-4)',
        color: 'var(--mantine-color-gray-7)',
        borderRadius: '4px',
        width: '24px',
        height: '24px',
        '&:hover': {
          backgroundColor: 'var(--mantine-color-gray-3)'
        }
      }
    }}
  >
    <IconPlus style={{ width: rem(12), height: rem(12) }} />
  </ActionIcon>
</Group>
      </Flex>

      <Flex justify="space-between" align="center" className={classes.secondRow}>
        <Text className={classes.price} style={{ 
            fontWeight: 700, 
            fontSize: '16px', 
            color: 'var(--mantine-color-dark-7)',
            marginBottom: '2px'
           }}>
          $ {product.price}
        </Text>

        <Button 
         style={{
            backgroundColor: 'var(--mantine-color-green-1)',
            color: 'var(--mantine-color-green-7)',
            minWidth: '180px', 
              }}
          size="sm"
          onClick={handleAddToCart}
          className={classes.addButton}
          rightSection={<IconShoppingCart size={16} />}
        >
          Add to cart
        </Button>
      </Flex>
    </Card>
  );
}