import NextAuth from 'next-auth';
import StravaProvider from 'next-auth/providers/strava'

export handler = NextAuth({

});

export { handler as GET, handler as Post }