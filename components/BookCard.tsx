// components/BookCard.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useThemeStore } from '../stores/themeStore';

interface BookCardProps {
    title: string;
    author?: string;
    rating: number;
    price?: string;
    status?: string;
    coverColor: string;
    onPress: () => void;
}

export const BookCard: React.FC<BookCardProps> = ({
    title,
    author,
    rating,
    price,
    status,
    coverColor,
    onPress
}) => {
    const { theme } = useThemeStore();

    return (
        <TouchableOpacity style={styles.bookCard} onPress={onPress}>
            <View style={[styles.bookCover, { backgroundColor: coverColor }]}>
                <View style={styles.bookSpine} />
            </View>
            <Text style={[styles.bookTitle, { color: theme.colors.text }]} numberOfLines={2}>
                {title}
            </Text>
            {author && (
                <Text style={[styles.bookAuthor, { color: theme.colors.textSecondary }]} numberOfLines={1}>
                    {author}
                </Text>
            )}
            <View style={styles.bookInfo}>
                <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={12} color="#FFD700" />
                    <Text style={[styles.rating, { color: theme.colors.textSecondary }]}>
                        {rating}
                    </Text>
                </View>
                {price && (
                    <Text style={[
                        price === 'Free' ? styles.freePrice : styles.price,
                        { color: price === 'Free' ? theme.colors.success : theme.colors.text }
                    ]}>
                        {price}
                    </Text>
                )}
                {status && (
                    <Text style={[styles.status, { color: theme.colors.primary }]}>
                        {status}
                    </Text>
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    bookCard: {
        width: 120,
    },
    bookCover: {
        width: 120,
        height: 180,
        borderRadius: 8,
        marginBottom: 8,
        position: 'relative',
        overflow: 'hidden',
    },
    bookSpine: {
        position: 'absolute',
        left: 8,
        top: 8,
        bottom: 8,
        width: 3,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 2,
    },
    bookTitle: {
        fontSize: 12,
        fontWeight: '600',
        marginBottom: 4,
        lineHeight: 16,
        minHeight: 32,
    },
    bookAuthor: {
        fontSize: 11,
        marginBottom: 4,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    bookInfo: {
        gap: 2,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginBottom: 2,
    },
    rating: {
        fontSize: 11,
    },
    price: {
        fontSize: 12,
        fontWeight: '600',
    },
    freePrice: {
        fontSize: 12,
        fontWeight: '600',
    },
    status: {
        fontSize: 11,
        fontWeight: '500',
    },
});