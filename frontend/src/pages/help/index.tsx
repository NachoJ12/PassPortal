import React from 'react';
import type { NextPage, GetStaticProps } from 'next';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BaseLayout from '@/components/layouts/base-layout';
import { Faqs, faqs } from '@/data/faqs';
import { getFaqs } from '@/service/faqs-service';
import { ThemeProvider, createTheme } from '@mui/system';

interface Props {
  faqs: Faqs[];
}

const Help = () => {
  return (
    <BaseLayout>
      <ul>
        {faqs.map((faq) => (
          <Accordion
            sx={{
              backgroundColor: '#070607',
              color: '#9d9c9d',
              width: '80%',
              alignSelf: 'center',
            }}
            key={faq.id}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </ul>
    </BaseLayout>
  );
};

export default Help;
