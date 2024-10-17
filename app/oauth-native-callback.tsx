import { useEffect } from 'react'
import { useRouter } from 'expo-router'
import * as WebBrowser from 'expo-web-browser'

export default function OAuthNativeCallback() {
  const router = useRouter()

  useEffect(() => {
    // Dismiss the WebBrowser and navigate to the desired screen
    WebBrowser.dismissBrowser()
    router.replace('/')
  }, [])

  return null
}
