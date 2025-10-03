import { Drawer, Group, Text, Image, ActionIcon, Stack, Box, Flex } from '@mantine/core';
import { IconPlus, IconMinus } from '@tabler/icons-react';
import { useCart } from '../../context/CartContext';
import classes from './Cart.module.css';

interface CartProps {
  opened: boolean;
  onClose: () => void;
}

export default function Cart({ opened, onClose }: CartProps) {
  const { state, updateQuantity } = useCart();

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      position="right"
      size="md"
      overlayProps={{ 
        opacity: 0.5, 
        blur: 4,
        onClick: onClose 
      }}
      withCloseButton={false}
      title={null}
      className={classes.drawer}
      styles={{
        content: {
          width: '500px',
          maxWidth: '90vw',
        },
        body: {
          padding: '0',
        }
      }}
    >
      <Box className={classes.cartWrapper}>
        {state.items.length === 0 ? (
          <Box className={classes.emptyCart}>
            <Image
              src="/images/cart_empty.png"
              width={120}
              height={120}
              alt="Empty cart"
              className={classes.emptyImage}
              fit="contain"
            />
            <Text size="xl" fw={700} className={classes.emptyTitle}>
              Your cart is empty!
            </Text>
          </Box>
        ) : (
          <Box className={classes.cartContent}>
            <Stack gap="md" className={classes.itemsList}>
              {state.items.map((item) => (
                <Box key={item.product.id} className={classes.cartItem}>
                  <Flex gap="md" align="center" justify="space-between">
                    <Image
                      src={item.product.image}
                      width={60}
                      height={60}
                      radius="md"
                      alt={item.product.name}
                      className={classes.productImage}
                    />
                    
                    <Box className={classes.productInfo}>
                      <Text 
                        size="sm" 
                        fw={500} 
                        className={classes.productName}
                      >
                        {item.product.name}
                      </Text>
                      <Text size="sm" fw={600} className={classes.itemPrice}>
                        ${item.product.price}
                      </Text>
                    </Box>

                    <Group gap="sm" align="center" className={classes.quantityGroup}>
                      <ActionIcon 
                        variant="outline" 
                        size="md"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className={classes.quantityButton}
                      >
                        <IconMinus size={14} />
                      </ActionIcon>
                      
                      <Text size="sm" fw={600} className={classes.quantityText}>
                        {item.quantity}
                      </Text>
                      
                      <ActionIcon 
                        variant="outline" 
                        size="md"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className={classes.quantityButton}
                      >
                        <IconPlus size={14} />
                      </ActionIcon>
                    </Group>
                  </Flex>
                </Box>
              ))}
            </Stack>

            <Box className={classes.totalSection}>
              <Flex justify="space-between" align="center" className={classes.totalRow}>
                <Text fw={600} size="xl" className={classes.totalLabel}>
                  Total
                </Text>
                <Text fw={700} size="xl" className={classes.totalPrice}>
                  ${state.total.toFixed(2)}
                </Text>
              </Flex>
            </Box>
          </Box>
        )}
      </Box>
    </Drawer>
  );
}