export interface Faqs {
    id: number
    question: string
    answer: string
}

export const faqs: Faqs[] = [
    {
        id: 1,
        question: "How do I buy tickets for an event?",
        answer: "To purchase tickets, simply visit our website, search for the event you're interested in, select the desired ticket quantity, and follow the on-screen instructions to complete the purchase."
    },
    {
        id: 2,
        question: "What payment methods do you accept?",
        answer: "We accept major credit and debit cards, including Visa, MasterCard, and American Express. Some events may also offer alternative payment methods like PayPal or Apple Pay."
    },
    {
        id: 3,
        question: "Is my personal information and payment data secure?",
        answer: "Yes, we take security seriously. Our website uses industry-standard encryption to protect your personal and payment information. Your data is safe with us."
    },
    {
        id: 4,
        question: "Can I get a refund if I can't attend the event?",
        answer: "Refund policies vary by event and organizer. Please review the event's refund policy before purchasing your tickets. Some events may offer refunds while others may not."
    },
    {
        id: 5,
        question: "How do I receive my tickets after purchase?",
        answer: "You will receive your tickets electronically, typically via email. You can either print the tickets or show them on your mobile device at the event entrance. Specific instructions will be provided during the checkout process."
    },
    {
        id: 6,
        question: "What if I lose my tickets or can't find the confirmation email?",
        answer: "Don't worry! You can usually log in to your account on our website and access your purchased tickets. If you're still having trouble, you can contact our customer support for assistance."
    },
    {
        id: 7,
        question: "Are there any additional fees or charges on top of the ticket price?",
        answer: "Some events may have additional fees, such as service charges or taxes. These will be clearly displayed during the checkout process so you know the total cost before finalizing your purchase."
    },
    {
        id: 8,
        question: "Can I transfer or resell my tickets to someone else?",
        answer: "Ticket transfer policies vary by event and organizer. Some events allow ticket transfers, while others do not. Check the event details or contact our customer support for guidance on ticket transfers."
    },
    {
        id: 9,
        question: "What do I do if I have accessibility or special seating needs?",
        answer: "If you have specific accessibility or seating requirements, please contact our customer support before purchasing tickets. We'll do our best to assist you in finding suitable seating arrangements."
    },
    {
        id: 10,
        question: "How can I contact customer support for assistance?",
        answer: "You can reach our customer support team by phone, email, or through our website's live chat feature. We're here to help with any questions or issues you may have."
    }
];
