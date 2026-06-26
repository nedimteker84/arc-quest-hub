import { useSignMessage } from "wagmi"

export function useWalletVerification(walletKey: string) {
  const verificationStorageKey = `arcQuest:${walletKey}:walletVerified`

  const isWalletVerified =
    localStorage.getItem(verificationStorageKey) === "true"

  const { signMessage, isPending } = useSignMessage()

  function verifyWallet() {
    signMessage(
      {
        message:
          "Verify my Arc Quest Hub account.\n\nThis signature does not cost gas and does not give permission to move funds.",
      },
      {
        onSuccess: () => {
          localStorage.setItem(verificationStorageKey, "true")
        },
      },
    )
  }

  function clearWalletVerification() {
    localStorage.removeItem(verificationStorageKey)
  }

  return {
    isWalletVerified,
    isVerifyingWallet: isPending,
    verifyWallet,
    clearWalletVerification,
  }
}