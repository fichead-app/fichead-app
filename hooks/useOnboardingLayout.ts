// hooks/useOnboardingLayout.ts
import { useRouter } from 'expo-router';
import { useThemeStore } from '../stores/themeStore';
import { useUserStore } from '../stores/userStore';

interface OnboardingLayoutProps {
    progressWidth: string;
    nextRoute: string;
    onContinue?: () => void;
    onSkip?: () => void;
    showSkip?: boolean;
}

export const useOnboardingLayout = ({
    progressWidth,
    nextRoute,
    onContinue,
    onSkip,
    showSkip = false
}: OnboardingLayoutProps) => {
    const router = useRouter();
    const { theme } = useThemeStore();
    const { updateUser } = useUserStore();

    const handleBack = () => {
        router.back();
    };

    const handleContinue = () => {
        if (onContinue) {
            onContinue();
        } else {
            router.push(nextRoute as any);
        }
    };

    const handleSkip = () => {
        if (onSkip) {
            onSkip();
        } else {
            router.push(nextRoute as any);
        }
    };

    return {
        router,
        theme,
        updateUser,
        handleBack,
        handleContinue,
        handleSkip,
        progressWidth,
        showSkip
    };
};