// app/(tabs)/wishlist.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Layout } from '../../components/Layout';
import { useThemeStore } from '../../stores/themeStore';

interface WishlistItemProps {
    title: string;
    author?: string;
    rating: number;
    price: string;
    coverColor: string;
    onPress: () => void;
    onOptionsPress: () => void;
}

const WishlistItem: React.FC<WishlistItemProps> = ({
    title,
    author,
    rating,
    price,
    coverColor,
    onPress,
    onOptionsPress
}) => {
    const { theme } = useThemeStore();

    return (
        <TouchableOpacity style={styles.wishlistItem} onPress={onPress}>
            <View style={[styles.bookCover, { backgroundColor: coverColor }]}>
                <View style={styles.bookSpine} />
            </View>

            <View style={styles.bookInfo}>
                <Text style={[styles.bookTitle, { color: theme.colors.text }]} numberOfLines={3}>
                    {title}
                </Text>
                {author && (
                    <Text style={[styles.bookAuthor, { color: theme.colors.textSecondary }]} numberOfLines={1}>
                        {author}
                    </Text>
                )}

                <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={14} color="#FFD700" />
                    <Text style={[styles.rating, { color: theme.colors.textSecondary }]}>
                        {rating}
                    </Text>
                </View>

                <Text style={[styles.price, { color: theme.colors.text }]}>
                    {price}
                </Text>
            </View>

            <TouchableOpacity
                style={styles.optionsButton}
                onPress={onOptionsPress}
            >
                <Ionicons name="ellipsis-vertical" size={20} color={theme.colors.textSecondary} />
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

export default function WishlistScreen() {
    const { theme } = useThemeStore();

    const router = useRouter();

    const handleFilterPress = () => {
        router.push('/filter');
    };

    const wishlistBooks = [
        {
            id: 1,
            title: 'Harry Potter and the Deathly Hallows',
            author: 'J.K. ROWLING',
            rating: 4.9,
            price: '$9.99',
            coverColor: '#1a237e'
        },
        {
            id: 2,
            title: 'The Lost Metal: A Mistborn Novel by Brandon Sanderson',
            rating: 4.8,
            price: '$4.99',
            coverColor: '#8D4004'
        },
        {
            id: 3,
            title: 'The Most Powerful Quotes: 400 Motivational Quotes and Sayings',
            rating: 4.9,
            price: '$2.50',
            coverColor: '#FF8C00'
        },
        {
            id: 4,
            title: 'Free Life Fantasy Online: Immortal Princess (Light Novel) Vol. 2',
            rating: 4.7,
            price: '$4.99',
            coverColor: '#6B46C1'
        },
        {
            id: 5,
            title: 'Harry Potter and the Prisoner of Azkaban',
            rating: 4.7,
            price: '$8.99',
            coverColor: '#1a237e'
        },
    ];

    const handleBookPress = (bookId: number) => {
        console.log('Book pressed:', bookId);
    };

    const handleOptionsPress = (bookId: number) => {
        console.log('Options pressed:', bookId);
    };

    return (
        <Layout contentStyle={styles.layoutContent}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.logoContainer}>
                        <Text style={[styles.logo, { color: theme.colors.primary }]}>📦</Text>
                        <Text style={[styles.appName, { color: theme.colors.text }]}>Wishlist</Text>
                    </View>
                    <View style={styles.headerActions}>
                        <TouchableOpacity>
                            <Ionicons name="search" size={24} color={theme.colors.text} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleFilterPress}>
                            <Ionicons name="options" size={24} color={theme.colors.text} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Wishlist Items */}
                {wishlistBooks.map((book) => (
                    <WishlistItem
                        key={book.id}
                        title={book.title}
                        author={book.author}
                        rating={book.rating}
                        price={book.price}
                        coverColor={book.coverColor}
                        onPress={() => handleBookPress(book.id)}
                        onOptionsPress={() => handleOptionsPress(book.id)}
                    />
                ))}
            </ScrollView>
        </Layout>
    );
}

const styles = StyleSheet.create({
    layoutContent: {
        paddingHorizontal: 0,
        paddingVertical: 0,
    },
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
        paddingTop: 8,
        paddingHorizontal: 16,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        fontSize: 24,
        marginRight: 8,
    },
    appName: {
        fontSize: 20,
        fontWeight: '700',
    },
    headerActions: {
        flexDirection: 'row',
        gap: 16,
    },
    wishlistItem: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 12,
        alignItems: 'flex-start',
    },
    bookCover: {
        width: 80,
        height: 120,
        borderRadius: 8,
        marginRight: 16,
        position: 'relative',
    },
    bookSpine: {
        position: 'absolute',
        left: 6,
        top: 6,
        bottom: 6,
        width: 2,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 1,
    },
    bookInfo: {
        flex: 1,
        paddingRight: 8,
    },
    bookTitle: {
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 22,
        marginBottom: 4,
    },
    bookAuthor: {
        fontSize: 14,
        marginBottom: 8,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginBottom: 8,
    },
    rating: {
        fontSize: 14,
    },
    price: {
        fontSize: 16,
        fontWeight: '600',
    },
    optionsButton: {
        padding: 8,
        marginTop: 8,
    },
});