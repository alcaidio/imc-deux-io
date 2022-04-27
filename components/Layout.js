import Head from "next/head";
import styles from "./Layout.module.css";

export default function Layout({ title, subtitle, children }) {
  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>{title}</title>
          <meta
            name="description"
            content="Calculate your body mass index in a second."
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1>{title}</h1>
          <h2>{subtitle}</h2>
          {children}
        </main>

        <footer className={styles.footer}>
          Made with ❤️ by&nbsp;
          <a
            href="https://www.linkedin.com/in/timothyalcaide/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Timothy
          </a>
        </footer>
      </div>
    </>
  );
}
