# Supabase Setup Guide

## Quick Start

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up/Login and create new project
3. Choose organization and region
4. Wait for project to be ready

### 2. Get API Keys
1. Go to Project Settings → API
2. Copy your Project URL
3. Copy your anon/public key

### 3. Update Environment Variables
Add to your `.env` file:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Run Database Schema
1. Go to SQL Editor in Supabase dashboard
2. Copy contents of `database/supabase-schema.sql`
3. Paste and run the SQL
4. Verify tables are created

### 5. Test Integration
1. Start your development server: `npm run dev`
2. Complete a test payment
3. Schedule a consultation
4. Access intake form and verify auto-save

## Database Schema

The schema creates three main tables:

### Payments Table
Stores Stripe payment information:
- `id` - Primary key
- `stripe_session_id` - Stripe checkout session ID
- `customer_email` - Customer email from Stripe
- `product` - Product purchased
- `amount` - Payment amount in cents
- `status` - Payment status (pending, completed, failed)

### Bookings Table
Stores consultation appointments:
- `id` - Primary key
- `payment_id` - Links to payments table
- `scheduled_time` - Appointment date/time
- `client_name` - Client name
- `client_email` - Client email
- `meeting_link` - Google Meet link
- `status` - Booking status (scheduled, completed, cancelled)

### Intakes Table
Stores form data:
- `id` - Primary key
- `payment_id` - Links to payments table
- `booking_id` - Links to bookings table
- `una_name` - UNA organization name
- `state` - State of formation
- `purpose` - Organization purpose
- `members` - JSON array of members
- `governance` - JSON object with governance info
- `operations` - JSON object with operations info
- `extras` - JSON object with additional info
- `organizer_info` - JSON object with organizer details

## Security

### Row Level Security (RLS)
- Enabled on all tables
- Users can only access their own data
- Policies based on email matching

### Access Control
- Intake form requires valid payment + booking
- Payment must be completed
- Booking must be scheduled
- Automatic validation on form access

## Testing

### Test Payment Flow
1. Use Stripe test cards:
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`
2. Complete payment on `/services`
3. Schedule consultation on `/schedule`
4. Access intake form and verify auto-save

### Verify Data
1. Check Supabase dashboard → Table Editor
2. Verify data appears in all three tables
3. Test form persistence by refreshing page

## Troubleshooting

### Common Issues

#### "Missing Supabase environment variables"
- Check `.env` file has correct variable names
- Restart development server after adding variables

#### "Access denied" on intake form
- Verify payment is completed in Stripe dashboard
- Check payment status in Supabase payments table
- Ensure booking exists and is scheduled

#### Auto-save not working
- Check browser console for errors
- Verify Supabase connection
- Check RLS policies are correct

#### Form data not loading
- Check payment_id and booking_id in URL
- Verify data exists in intakes table
- Check browser console for errors

### Debug Mode
Add to your `.env` for detailed logging:
```env
VITE_DEBUG_SUPABASE=true
```

## Production Deployment

### Environment Variables
Set these in your production environment:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### Database Security
- Review RLS policies
- Test access control thoroughly
- Monitor database usage

### Performance
- Add indexes for frequently queried columns
- Monitor query performance
- Set up database backups

## Support

### Supabase Resources
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)
- [Supabase GitHub](https://github.com/supabase/supabase)

### Project-Specific Issues
- Check `SPRINT3_INTAKE_INTEGRATION.md` for detailed implementation
- Review component code for specific error handling
- Test with different user scenarios


