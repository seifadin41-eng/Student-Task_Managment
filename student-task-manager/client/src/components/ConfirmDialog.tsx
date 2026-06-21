import {
  Dialog,
  YStack,
  XStack,
  Button,
  Text,
} from 'tamagui';

interface ConfirmDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  message: string;
}

export function ConfirmDialog({ open, onConfirm, onCancel, title, message }: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onCancel(); }}>
      <Dialog.Portal>
        <Dialog.Overlay
          backgroundColor="$backgroundTransparent"
          backdropFilter="blur(4px)"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Dialog.Content
          backgroundColor="$background"
          borderRadius="$6"
          padding="$6"
          space="$4"
          enterStyle={{ opacity: 0, scale: 0.95 }}
          exitStyle={{ opacity: 0, scale: 0.95 }}
          animation="quick"
        >
          <YStack space="$2">
            <Dialog.Title>
              <Text fontSize="$6" fontWeight="bold">{title}</Text>
            </Dialog.Title>
            <Text fontSize="$4" color="$gray11">{message}</Text>
          </YStack>
          <XStack space="$3" justifyContent="flex-end">
            <Button onPress={onCancel}>
              Cancel
            </Button>
            <Button theme="red" onPress={onConfirm}>
              Delete
            </Button>
          </XStack>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}
