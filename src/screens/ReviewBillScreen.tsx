import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { colors } from '../theme/colors';
import { globalStyles } from '../theme/globalStyles';

export default function ReviewBillScreen({ route, navigation }: any) {
  const { billData } = route.params;

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={{fontSize: 20}}>❮</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Revisemos tu cuenta</Text>
        
        <View style={styles.restaurantHeader}>
          <View style={styles.iconBox}>
            <Text style={{fontSize: 24}}>🧾</Text>
          </View>
          <View>
            <Text style={styles.restaurantName}>{billData?.restaurant || 'Restaurante XYZ'}</Text>
            <Text style={styles.dateText}>{billData?.date || '04 de octubre de 2026'}</Text>
          </View>
        </View>
        
        <View style={styles.card}>
          <View style={styles.tableHeader}>
            <Text style={styles.columnHeader}>Producto</Text>
            <Text style={styles.columnHeader}>Precio</Text>
          </View>
          
          <View style={styles.divider} />
          
          {billData?.items?.map((item: any, index: number) => (
            <View key={index} style={styles.itemRow}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>${item.price.toLocaleString('es-CL')}</Text>
            </View>
          ))}
          
          <View style={styles.divider} />
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>${(billData?.total - (billData?.tip || 0)).toLocaleString('es-CL')}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Propina</Text>
            <Text style={styles.summaryValue}>${(billData?.tip || 0).toLocaleString('es-CL')}</Text>
          </View>
          
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${billData?.total?.toLocaleString('es-CL')}</Text>
          </View>
          
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+ Agregar producto</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={globalStyles.buttonPrimary} 
          onPress={() => navigation.navigate('Participants', { billData })}
        >
          <Text style={globalStyles.buttonPrimaryText}>Siguiente</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginTop: 10,
    marginBottom: 24,
  },
  restaurantHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  iconBox: {
    width: 48,
    height: 48,
    backgroundColor: colors.surface,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  dateText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 40,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  columnHeader: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 16,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  itemName: {
    fontSize: 15,
    color: colors.text,
    flex: 1,
  },
  itemPrice: {
    fontSize: 15,
    color: colors.text,
    fontWeight: '500',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 15,
    color: colors.textSecondary,
  },
  summaryValue: {
    fontSize: 15,
    color: colors.textSecondary,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 24,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
  },
  addButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  addButtonText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '700',
  },
  footer: {
    padding: 24,
    paddingBottom: 40,
    backgroundColor: colors.background,
  }
});
