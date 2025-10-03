import { Text, Badge, Box, Button } from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';
import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import Cart from '../Cart/Cart';
import classes from './Header.module.css';

export default function Header() {
  const [cartOpened, setCartOpened] = useState(false);
  const { state } = useCart();

  return (
    <>
      <header className={classes.header}>
        <div className={classes.headerContent}>
          <Box style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Text 
              span 
              style={{ 
                fontWeight: 700, 
                fontSize: '1.5rem', 
                color: 'var(--mantine-color-dark-7)',
                fontFamily: 'inherit'
              }}
            >
              Vegetable{' '}
            </Text>
           <Text 
            span 
               style={{ 
              fontWeight: 400,
              fontSize: 20,
              color: 'white', 
              backgroundColor: 'var(--mantine-color-green-7)', 
              borderRadius: '20px',
              padding: '4px 12px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              fontFamily: 'inherit'
            }}
>
               SHOP
          </Text>
          </Box>
          
          <Button 
            color="green"
            size="md"
            radius="md" 
            onClick={() => setCartOpened(true)}
            className={classes.cartButton}
            leftSection={
              <Box className={classes.cartBadgeContainer}>
                <Badge 
                  circle 
                  className={classes.cartBadge}
                >
                  {state.itemCount}
                </Badge>
              </Box>
            }
            rightSection={
              <IconShoppingCart size={20} className={classes.cartIcon} />
            }
          >
            Cart
          </Button>
        </div>
      </header>

      <Cart opened={cartOpened} onClose={() => setCartOpened(false)} />
    </>
  );
}