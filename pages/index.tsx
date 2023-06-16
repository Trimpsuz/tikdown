import { createStyles, Container, Text, TextInput, Button, keyframes } from '@mantine/core';
import { Link1Icon, DownloadIcon, ArrowLeftIcon } from '@radix-ui/react-icons';
import type { NextPage } from 'next';
import Footer from '../components/Footer';
import { useState, ChangeEvent } from 'react';
import axios from 'axios';

const BREAKPOINT = 755;

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

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    [`@media (max-width: ${BREAKPOINT})`]: {
      marginTop: theme.spacing.xl,
    },
  },
  header: {
    fontSize: 45,
    fontWeight: 900,
    lineHeight: 1.1,
    marginTop: theme.spacing.xl,
    textAlign: 'center',
    padding: 0,
    color: theme.white,

    [`@media (max-width: ${BREAKPOINT})`]: {
      fontSize: 42,
      lineHeight: 1.2,
    },
  },
  downloadButton: {
    marginRight: theme.spacing.md,
    marginBottom: theme.spacing.xl,
    ':last-child': {
      marginRight: 0,
    },
  },
  buttonRow: {
    display: 'flex',
  },
  downloadControls: {
    marginTop: theme.spacing.xl * 2,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',

    [`@media (max-width: ${BREAKPOINT})`]: {
      marginTop: theme.spacing.xl,
    },
  },
}));

const Home: NextPage = () => {
  const { classes } = useStyles();

  const [text, setText] = useState('');

  const [data, setData] = useState<any | null>(null);

  const [loading, setLoading] = useState(false);

  async function handleClick() {
    if (/(https?:\/\/)?(www\.)?tiktok\.com\/@([^/]+)\/video\/(\d+)\/?/.test(text)) {
      const id = text.match(/\/(\d{19})\/?$/);
      if (id) {
        setLoading(true);
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
    <>
      <Container size={700} className={classes.inner}>
        <Text className={classes.header}>{data.aweme_list[0].author.nickname}'s video</Text>
        <div className={classes.downloadControls}>
          <div className={classes.buttonRow}>
            <Button
              component="a"
              href={data.aweme_list[0].video.play_addr.url_list[0]}
              leftIcon={<DownloadIcon />}
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
              className={classes.downloadButton}
            >
              Download video
            </Button>
            <Button
              component="a"
              href={data.aweme_list[0].video.download_addr.url_list[0]}
              leftIcon={<DownloadIcon />}
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
              className={classes.downloadButton}
            >
              Download video (watermark)
            </Button>
            <Button
              component="a"
              href={data.aweme_list[0].music.play_url.url_list[0]}
              leftIcon={<DownloadIcon />}
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
              className={classes.downloadButton}
            >
              Download sound
            </Button>
          </div>
          <Button
            component="a"
            href={'/'}
            leftIcon={<ArrowLeftIcon />}
            styles={(theme) => ({
              root: {
                color: '#e534af',
                fontSize: 16,
                fontWeight: 500,
                border: 0,
                paddingLeft: 20,
                paddingRight: 20,

                '&:hover': {
                  color: theme.fn.darken('#e534af', 0.1),
                  backgroundColor: theme.fn.darken('#e534af', 0.65),
                },
              },
            })}
            variant="outline"
            size="md"
          >
            Download another
          </Button>
        </div>
      </Container>

      <Footer></Footer>
    </>
  ) : (
    <>
      <Container size={700} className={classes.inner}>
        <h1 className={classes.title}>
          <Text component="span" variant="gradient" gradient={{ from: '#7d34e7', to: '#e534af' }} inherit>
            tikdown
          </Text>
        </h1>
        <div className={classes.controls}>
          <TextInput onChange={handleChange} onKeyDown={handleKeyDown} style={{ marginRight: 8, flex: 1 }} placeholder="Tiktok URL or video ID" size="md" icon={<Link1Icon />} />
          <Button
            loading={loading}
            loaderPosition="right"
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
