import React, { FC } from 'react';
import { Helmet } from 'react-helmet';

export interface SEOProps {
  title?: string;
  description?: string;
  lang?: string;
}

const defaultMetaTags: React.DetailedHTMLProps<
  React.MetaHTMLAttributes<HTMLMetaElement>,
  HTMLMetaElement
>[] = [
  {
    charSet: 'utf-8',
  },
  {
    name: 'viewport',
    content: 'width=device-width, initial-scale=1',
  },
];

const SEO: FC<SEOProps> = ({ title, lang = 'en', description }) => {
  const metaTags = defaultMetaTags.slice(0);
  if (description) {
    metaTags.push({
      name: 'description',
      content: description,
    });
  }
  return (
    <Helmet
      title={title}
      titleTemplate="%s | SSR HMR TS"
      defaultTitle="SSR HMR TS"
      htmlAttributes={{ lang }}
      meta={metaTags}
    />
  );
};

export default SEO;
