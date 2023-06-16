import { createStyles, Container, Text, TextInput, Button, keyframes } from '@mantine/core';
import { Link1Icon } from '@radix-ui/react-icons';
import type { NextPage } from 'next';
import Footer from '../components/Footer';
import { useState, ChangeEvent } from 'react';
import axios from 'axios';

const BREAKPOINT = 755;

const fadeOut = keyframes({
  from: {
    opacity: 1,
    transform: 'translateY(0)',
  },

  to: {
    opacity: 0,
    transform: 'translateY(-20px)',
  },
});

const useStyles = createStyles((theme) => ({
  inner: {
    position: 'relative',
    paddingTop: '32vh',
    [`@media (max-width: ${BREAKPOINT})`]: {
      paddingBottom: 80,
      paddingTop: 80,
    },
  },
  title: {
    fontSize: 62,
    fontWeight: 900,
    lineHeight: 1.1,
    textAlign: 'center',
    margin: 0,
    padding: 0,
    color: theme.white,

    [`@media (max-width: ${BREAKPOINT})`]: {
      fontSize: 42,
      lineHeight: 1.2,
    },
  },
  controls: {
    marginTop: theme.spacing.xl * 2,

    [`@media (max-width: ${BREAKPOINT})`]: {
      marginTop: theme.spacing.xl,
    },
  },
  notification: {
    animation: `${fadeOut} 2s forwards`,
  },
}));

const Home: NextPage = () => {
  const { classes } = useStyles();

  const [text, setText] = useState('');

  const [data, setData] = useState(null);

  async function handleClick() {
    if (/(https?:\/\/)?(www\.)?tiktok\.com\/@([^/]+)\/video\/(\d+)\/?/.test(text)) {
      const id = text.match(/\/(\d{19})\/?$/);
      if (id) {
        const res = await axios.get(`https://corsproxy.io/?https://api16-normal-c-useast1a.tiktokv.com/aweme/v1/feed/?aweme_id=${id[1]}`);
        setData(res.data);
      }
    } else {
      console.log('Invalid URL');
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    setText(event.target.value);
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      handleClick();
    }
  };

  return data ? (
    <></>
  ) : (
    <>
      <Container size={700} className={classes.inner}>
        <h1 className={classes.title}>
          <Text component="span" variant="gradient" gradient={{ from: '#7d34e7', to: '#e534af' }} inherit>
            tikdown
          </Text>
        </h1>
        <div className={classes.controls} style={{ display: 'flex', alignItems: 'center' }}>
          <TextInput onChange={handleChange} onKeyDown={handleKeyDown} style={{ marginRight: 8, flex: 1 }} placeholder="Tiktok URL" size="md" icon={<Link1Icon />} />
          <Button
            styles={(theme) => ({
              root: {
                backgroundColor: '#e534af',
                fontSize: 16,
                fontWeight: 500,
                border: 0,
                paddingLeft: 20,
                paddingRight: 20,

                '&:hover': {
                  backgroundColor: theme.fn.darken('#e534af', 0.1),
                },
              },
            })}
            size="md"
            onClick={handleClick}
          >
            Download
          </Button>
        </div>
      </Container>
      <Footer></Footer>
    </>
  );
};

export default Home;
