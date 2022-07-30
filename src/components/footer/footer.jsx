import React from 'react'
import styled from 'styled-components'
import { Box, useTheme } from '@mui/system'
import FavoriteIcon from '@mui/icons-material/Favorite'
import TwitterIcon from '@mui/icons-material/Twitter'
import GitHubIcon from '@mui/icons-material/GitHub'
import coffee from './coffee.jpg'

export const Footer = () => {
  

  return (
    <Container width>
      <Text align="center">
        Made with <Heart color="primary" /> by Arnab Ghosh
      </Text>

      <CoffeeLink
        href="https://www.buymeacoffee.com/arnabghosh"
        target="_blank"
        rel="noopener noreferrer"
      >
        <CoffeeImage src={coffee} alt="Buy me a coffee" />
      </CoffeeLink>

      <Box display="flex" justifyContent="space-between" width={60} m="auto">
        <a
          href="https://twitter.com/arnabghosh_co"
          target="_blank"
          rel="noopener noreferrer"
        >
          <TwitterIcon color='primary' />
        </a>
        <a
          href="https://github.com/ghosharnab00/Pomo.do"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubIcon color='primary' />
        </a>
      </Box>
    </Container>
  )
}

const Container = styled.footer`
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 5px;
  padding-top: 20px;
`
const Text = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px 0;
  flex: 0 0 auto;
  font-size: 10px;
`

const Heart = styled(FavoriteIcon)`
  margin: 0 2px;
  position: relative;
  bottom: 4px;
`

const CoffeeLink = styled.a`
  width: 100px;
  margin: auto;
  margin-bottom: 5px;
`

const CoffeeImage = styled.img`
  width: 100%;
  border-radius: 5px;
`
