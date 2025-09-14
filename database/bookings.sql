-- Bookings table for storing scheduled consultation appointments
-- Links to payments table to track which payment led to which booking

create table bookings (
  id uuid primary key default gen_random_uuid(),
  payment_id uuid references payments(id),
  scheduled_time timestamptz not null,
  client_name text not null,
  client_email text not null,
  meeting_link text,
  status text default 'scheduled' check (status in ('scheduled', 'completed', 'cancelled', 'rescheduled')),
  notes text,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

-- Index for efficient lookups
create index idx_bookings_payment_id on bookings(payment_id);
create index idx_bookings_client_email on bookings(client_email);
create index idx_bookings_scheduled_time on bookings(scheduled_time);

-- Add updated_at trigger
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_bookings_updated_at
  before update on bookings
  for each row
  execute function update_updated_at_column();


