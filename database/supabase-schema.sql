-- Supabase Database Schema for UNA Platform
-- Run this in your Supabase SQL editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Payments table (if not already created)
create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  stripe_session_id text not null unique,
  customer_email text,
  product text,
  amount integer,
  status text default 'pending',
  created_at timestamp with time zone default now()
);

-- Bookings table (if not already created)
create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  payment_id uuid references payments(id) on delete cascade,
  scheduled_time timestamptz not null,
  client_name text not null,
  client_email text not null,
  meeting_link text,
  status text default 'scheduled' check (status in ('scheduled', 'completed', 'cancelled', 'rescheduled')),
  notes text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Intakes table
create table intakes (
  id uuid primary key default gen_random_uuid(),
  payment_id uuid references payments(id) on delete cascade,
  booking_id uuid references bookings(id) on delete set null,
  una_name text,
  state text,
  purpose text,
  members jsonb default '[]'::jsonb,
  governance jsonb default '{}'::jsonb,
  operations jsonb default '{}'::jsonb,
  extras jsonb default '{}'::jsonb,
  organizer_info jsonb default '{}'::jsonb,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Indexes for performance
create index if not exists idx_payments_stripe_session_id on payments(stripe_session_id);
create index if not exists idx_payments_customer_email on payments(customer_email);
create index if not exists idx_bookings_payment_id on bookings(payment_id);
create index if not exists idx_bookings_client_email on bookings(client_email);
create index if not exists idx_bookings_scheduled_time on bookings(scheduled_time);
create index if not exists idx_intakes_payment_id on intakes(payment_id);
create index if not exists idx_intakes_booking_id on intakes(booking_id);

-- Updated_at trigger function
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Apply updated_at triggers
drop trigger if exists update_payments_updated_at on payments;
create trigger update_payments_updated_at
  before update on payments
  for each row
  execute function update_updated_at_column();

drop trigger if exists update_bookings_updated_at on bookings;
create trigger update_bookings_updated_at
  before update on bookings
  for each row
  execute function update_updated_at_column();

drop trigger if exists update_intakes_updated_at on intakes;
create trigger update_intakes_updated_at
  before update on intakes
  for each row
  execute function update_updated_at_column();

-- Row Level Security (RLS) policies
alter table payments enable row level security;
alter table bookings enable row level security;
alter table intakes enable row level security;

-- Allow users to read their own data based on email
create policy "Users can view their own payments" on payments
  for select using (customer_email = current_setting('request.jwt.claims', true)::json->>'email');

create policy "Users can view their own bookings" on bookings
  for select using (client_email = current_setting('request.jwt.claims', true)::json->>'email');

create policy "Users can view their own intakes" on intakes
  for select using (
    payment_id in (
      select id from payments 
      where customer_email = current_setting('request.jwt.claims', true)::json->>'email'
    )
  );

-- Allow users to insert their own data
create policy "Users can insert their own payments" on payments
  for insert with check (true);

create policy "Users can insert their own bookings" on bookings
  for insert with check (true);

create policy "Users can insert their own intakes" on intakes
  for insert with check (true);

-- Allow users to update their own data
create policy "Users can update their own payments" on payments
  for update using (customer_email = current_setting('request.jwt.claims', true)::json->>'email');

create policy "Users can update their own bookings" on bookings
  for update using (client_email = current_setting('request.jwt.claims', true)::json->>'email');

create policy "Users can update their own intakes" on intakes
  for update using (
    payment_id in (
      select id from payments 
      where customer_email = current_setting('request.jwt.claims', true)::json->>'email'
    )
  );


