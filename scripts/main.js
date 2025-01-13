// Main JavaScript for Soul Connect
import { createTherapistCards, createModeratorCards } from './cards.js';

// Therapist data
export const therapists = [
    {
        name: "G Sharath Chandra",
        photo: "https://i.ibb.co/59vKF3G/aryan-2.jpg",
        specialization: "Mental Health & Cultural Integration",
        expertise: ["Cultural Integration", "Men's Mental Health", "Career Stress Management"]
    },
    {
        name: "Apurva Upadhyay",
        photo: "https://i.ibb.co/2qnQ1DJ/apurva.jpg",
        specialization: "Mental Health & Family Support",
        expertise: ["Depression & Anxiety", "Family Counseling", "Support Group Facilitation"]
    },
    {
        name: "Catherine Mary Joy",
        photo: "https://i.ibb.co/4N7mxX6/CMJ.jpg",
        specialization: "Family Dynamics & Relationships",
        expertise: ["Family Counseling", "Relationship Therapy", "Cross-Cultural Adaptation"]
    },
    {
        name: "Malavika R",
        photo: "https://i.ibb.co/KV5R5Hb/MR.jpg",
        specialization: "Anxiety & Women's Wellness",
        expertise: ["Women's Mental Health", "Anxiety Management", "Work-Life Balance"]
    },
    {
        name: "Shashank Shukla",
        photo: "https://i.ibb.co/CsQyqTp/shashank.jpg",
        specialization: "Emotion Focused Therapy",
        expertise: ["Romantic Relationships", "Connection", "Heartbreak"]
    },
    {
        name: "Dr. Sarah Matthews",
        photo: "",
        specialization: "Youth & Teen Counseling",
        expertise: ["Teen Psychology", "Academic Stress", "Identity Development"]
    }
];

// Peer Moderator data
export const moderators = [
    {
        name: "Chaitanya Kanoria",
        photo: "https://i.ibb.co/gDwDXXM/chaitanya.jpg",
        specialization: "Peer Specialist & Compassionate Communication",
        expertise: ["Communication Skills", "Philosophy & Spirituality", "Human Values"],
        isVerified: true,
        badgeText: "Expert Moderator",
        badgeType: "expert",
        group: "verified"
    },
    {
        name: "Abhuday Singh",
        photo: "https://i.ibb.co/LNCb19V/abhuday.jpg",
        specialization: "Men's Mental Health & Wellness",
        expertise: ["Men's Mental Health", "Personal Growth", "Stress Management"],
        isVerified: true,
        badgeText: "Senior Moderator",
        badgeType: "senior",
        group: "verified"
    }
];

// Initialize the application
function initializeApp() {
    document.addEventListener('DOMContentLoaded', () => {
        createTherapistCards(therapists);
        createModeratorCards(moderators);
    });
}

// Start the application
initializeApp();