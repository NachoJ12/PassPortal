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
import Link from 'next/link';

interface Props {
	faqs: Faqs[];
}

const Help: NextPage<Props> = () => {
	return (
		<BaseLayout>
			<div className='help-page'>
				<h1 style={{ textAlign: "center", marginTop: "5rem !important", color: "white !important", }}>
					Frequently Ask Questions
				</h1>
				<ul className='faqs_list'>
					{faqs?.map((faq) => (
						<Accordion sx={{ backgroundColor: "#070607 !important", color: "#9d9c9d !important", width: "80% !important", alignSelf: "center !important" }} key={faq.id} >
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel1a-content"
								id="panel1a-header"
							>
								<Typography>{faq.question}</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Typography>
									{faq.answer}
								</Typography>
							</AccordionDetails>
						</Accordion>
					))}
				</ul>
				<div>
					<h4 style={{ textAlign: "center", marginTop: "3rem !important ", color: "#9d9c9d !important", }}>
						More Doubts?
						<span style={{ color: "#9d9c9d !important!important" }}>
							<Link
								href="/contact"
							>
								Contact Us
							</Link>
						</span>
					</h4>
				</div>
			</div>

		</BaseLayout >
	)
}

export default Help;

