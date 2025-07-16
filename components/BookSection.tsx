// components/BookSection.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useThemeStore } from '../stores/themeStore';
import { BookCard } from './BookCard';

interface Book {
    id: number;
    title: string;
    author?: string;
    rating: number;
    price?: string;
    status?: string;
    coverColor: string;
}

interface BookSectionProps {
    title: string;
    books: Book[];
    onSeeAll: () => void;
    isLast?: boolean; // Nova prop para identificar a última seção
}

export const BookSection: React.FC<BookSectionProps> = ({ title, books, onSeeAll, isLast = false }) => {
    const { theme } = useThemeStore();

    return (
        <View style={[styles.section, isLast && styles.lastSection]}>
            <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                    {title}
                </Text>
                <TouchableOpacity onPress={onSeeAll} style={styles.seeAllButton}>
                    <Ionicons name="chevron-forward" size={20} color={theme.colors.primary} />
                </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.booksContainer}>
                    {books.map((book) => (
                        <BookCard
                            key={book.id}
                            title={book.title}
                            author={book.author}
                            rating={book.rating}
                            price={book.price}
                            status={book.status}
                            coverColor={book.coverColor}
                            onPress={() => console.log('Book pressed:', book.title)}
                        />
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    section: {
        marginBottom: 20,
    },
    lastSection: {
        marginBottom: 0, // Remove margin da última seção
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        paddingHorizontal: 0, // Remove padding lateral
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        paddingLeft: 16, // Adiciona padding só no texto
    },
    seeAllButton: {
        paddingRight: 16, // Adiciona padding só no botão
    },
    booksContainer: {
        flexDirection: 'row',
        gap: 16,
        paddingLeft: 16,
        paddingRight: 16,
    },
});