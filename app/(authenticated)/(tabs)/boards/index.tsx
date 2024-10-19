import { View, Text, Button } from 'react-native'
import React from 'react'
import { useAuth } from '@clerk/clerk-expo'

const index = () => {
  const { signOut } = useAuth()

  const signOutUser = async () => {
    await signOut()
    console.log('Signed out')
  }
  return (
    <View>
      <Text>You are logged in!</Text>
      <Button title="Sign Out" onPress={signOutUser} />
    </View>
  )
}

export default index
