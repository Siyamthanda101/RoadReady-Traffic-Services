import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "System Architecture & How It Works | RoadReady" },
      { name: "description", content: "Technical research documentation for RoadReady: architecture, roles, workflows, database, authentication, authorization, data flow and known limitations." },
      { property: "og:title", content: "RoadReady — System Architecture & How It Works" },
      { property: "og:description", content: "A researcher-facing technical explanation of the RoadReady digital traffic-services platform." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: DocsPage,
});

type State = "implemented" | "partial" | "ui-only" | "recommended";

const stateStyle: Record<State, string> = {
  implemented: "border-success/40 bg-success/10 text-success",
  partial: "border-warning/50 bg-warning/15 text-foreground",
  "ui-only": "border-border bg-muted text-muted-foreground",
  recommended: "border-primary/40 bg-primary/10 text-primary",
};

const stateLabel: Record<State, string> = {
  implemented: "Implemented",
  partial: "Partially implemented",
  "ui-only": "Planned / UI only",
  recommended: "Recommended",
};

function Tag({ state }: { state: State }) {
  return (
    <span className={`inline-flex shrink-0 items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold ${stateStyle[state]}`}>
      {stateLabel[state]}
    </span>
  );
}

function Section({ id, n, title, lead, children }: { id: string; n: string; title: string; lead?: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-border pt-10">
      <p className="text-xs font-bold uppercase tracking-widest text-primary">Section {n}</p>
      <h2 className="mt-2 text-3xl font-black tracking-tight">{title}</h2>
      {lead ? <p className="mt-3 max-w-3xl text-muted-foreground">{lead}</p> : null}
      <div className="mt-6 grid gap-5">{children}</div>
    </section>
  );
}

function Card({ title, state, children }: { title: string; state?: State; children: ReactNode }) {
  return (
    <article className="rounded-lg border border-border bg-card p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-base font-bold">{title}</h3>
        {state ? <Tag state={state} /> : null}
      </div>
      <div className="mt-3 grid gap-3 text-sm leading-7 text-muted-foreground">{children}</div>
    </article>
  );
}

function Expand({ summary, children }: { summary: string; children: ReactNode }) {
  return (
    <details className="group rounded-lg border border-border bg-card">
      <summary className="cursor-pointer list-none px-5 py-4 text-sm font-bold marker:hidden">
        <span className="mr-2 inline-block transition-transform group-open:rotate-90">▶</span>
        {summary}
      </summary>
      <div className="grid gap-3 border-t border-border px-5 py-4 text-sm leading-7 text-muted-foreground">{children}</div>
    </details>
  );
}

function Diagram({ label, children }: { label: string; children: string }) {
  return (
    <figure className="overflow-x-auto rounded-lg border border-border bg-road p-5 text-primary-foreground">
      <pre className="text-[12px] leading-5"><code>{children}</code></pre>
      <figcaption className="mt-3 text-xs opacity-70">{label}</figcaption>
    </figure>
  );
}

function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-card">
      <table className="w-full text-left text-sm">
        <thead className="bg-muted/60 text-xs uppercase tracking-wide text-muted-foreground">
          <tr>{head.map((h) => <th key={h} className="px-4 py-3 font-bold">{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-border align-top">
              {row.map((cell, j) => <td key={j} className="px-4 py-3 text-muted-foreground">{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const toc = [
  ["overview", "1. System Overview"],
  ["roles", "2. User Roles"],
  ["architecture", "3. Architecture"],
  ["citizen-workflow", "4. Citizen Workflow"],
  ["admin-workflow", "5. Administrator Workflow"],
  ["lifecycle", "6. Application Lifecycle"],
  ["database", "7. Database"],
  ["authentication", "8. Authentication"],
  ["authorization", "9. Authorization"],
  ["data-flow", "10. Data Flow"],
  ["vehicles", "11. Vehicles"],
  ["fines", "12. Fines & Payments"],
  ["notifications", "13. Notifications"],
  ["assistant", "14. Traffic Services Assistant"],
  ["api", "15. API / Backend"],
  ["errors", "16. Error Handling"],
  ["security", "17. Security Model"],
  ["researcher", "18. Researcher Summary"],
  ["limitations", "19. Known Limitations"],
  ["improvements", "20. Future Improvements"],
] as const;

function DocsPage() {
  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link to="/" className="flex items-center gap-3" aria-label="RoadReady home">
            <span className="grid size-11 place-items-center rounded-md bg-primary text-primary-foreground"><ShieldCheck /></span>
            <span><strong className="block text-lg font-bold">RoadReady</strong><span className="block text-xs text-muted-foreground">Technical documentation</span></span>
          </Link>
          <Link to="/auth" search={{ mode: "login" }} className="text-sm font-bold text-primary hover:underline">Sign in</Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-12 lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-12 lg:px-8">
        <nav aria-label="Contents" className="mb-10 lg:sticky lg:top-8 lg:mb-0 lg:self-start">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Contents</p>
          <ul className="mt-3 grid gap-1 text-sm">
            {toc.map(([id, label]) => (
              <li key={id}><a href={`#${id}`} className="block rounded px-2 py-1 text-muted-foreground hover:bg-muted hover:text-foreground">{label}</a></li>
            ))}
          </ul>
        </nav>

        <div className="min-w-0">
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">System Architecture &amp; How It Works</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">
            A researcher-facing description of the RoadReady digital traffic-services platform, derived from the actual
            source code, routes, components, database migrations and authentication configuration of this project.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Tag state="implemented" /><Tag state="partial" /><Tag state="ui-only" /><Tag state="recommended" />
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Every claim below is labelled with one of these accuracy markers. Nothing is described as existing unless it
            can be traced to code in this repository.
          </p>

          <div className="mt-12 grid gap-12">

            {/* 1 */}
            <Section id="overview" n="1" title="System Overview"
              lead="RoadReady replaces counter-based traffic-department paperwork with an online account through which a citizen requests services and an authorised administrator processes them.">
              <Card title="The problem it solves" state="implemented">
                <p>Traffic-department services in South Africa normally require physical visits, queueing and paper forms, with no
                  visibility of progress. RoadReady moves the request-and-decision loop online: a citizen submits a licence test
                  booking or a vehicle registration from a browser, and can see the exact state of that request at any time.
                  Administrators work the same records from a single queue instead of a filing system.</p>
              </Card>
              <Card title="Who it is for" state="implemented">
                <p><strong>Citizens</strong> — anyone who needs a learner's or driver's licence test, needs to record a vehicle in
                  order to obtain a disc reference, or needs to see traffic fines issued against them.</p>
                <p><strong>Authorised administrators</strong> — traffic-department staff who review submissions, verify vehicles,
                  monitor fines and appointments, and inspect an activity trail.</p>
              </Card>
              <Card title="Services actually provided" state="implemented">
                <p>Learner's and driver's licence test bookings; vehicle registration records; a fines register with payment
                  status; account/profile management; derived notifications; and a rule-based Traffic Services Assistant that
                  answers questions from the signed-in citizen's own records (for example, recalling a forgotten number plate).</p>
              </Card>
              <Card title="Why it is called “secure”" state="implemented">
                <p>Security is not implemented in the interface — it is implemented in the database. Every table has Row Level
                  Security enabled, and the policies scope reads and writes to <code>auth.uid()</code>. Administrator access is
                  decided by a separate <code>user_roles</code> table checked through a <code>SECURITY DEFINER</code> function in a
                  private schema. A citizen who bypasses the UI entirely and calls the API directly still cannot read another
                  citizen's records. See sections 9 and 17, including the honest weaknesses.</p>
              </Card>
            </Section>

            {/* 2 */}
            <Section id="roles" n="2" title="User Roles"
              lead="The database defines exactly two roles in the app_role enum: 'user' and 'admin'. There is no third database role.">
              <Diagram label="Role assignment path (assign_default_user_role trigger on public.profiles)">{`profile row inserted
        │
        ├── always → user_roles(user_id, 'user')
        │
        └── if verified auth email = the designated administrator address
                       → user_roles(user_id, 'admin')`}</Diagram>

              <Card title="Citizen / user" state="implemented">
                <p>Registers with email + password (or Google), signs in, and lands on <code>/dashboard</code>. Can: view an
                  overview with summary cards and an “action required” list; book a learner's or driver's test; register a vehicle;
                  view their own applications with a progress tracker; view their own fines; open documents derived from approved
                  records; read derived notifications; use the assistant; view and mask profile identifiers; trigger a password
                  reset email and sign out of all devices.</p>
                <p>A driver's test booking is blocked in the UI unless the profile has a recorded learner's number.
                  <span className="ml-1 font-semibold text-foreground">Note:</span> that rule is a frontend check only — the database does not enforce it.</p>
              </Card>
              <Card title="Administrator" state="implemented">
                <p>Sees a different navigation tree and different views in the same <code>/dashboard</code> route. Can: view a
                  system overview with monthly trends and a prioritised task queue; list every citizen profile; review, approve,
                  reject, pass or fail applications with a mandatory reason on rejection; verify or reject vehicles; browse
                  outstanding fines, payments and fine history; view upcoming and completed appointments; browse submitted
                  documents; search all records from the header; and read a reconstructed audit trail.</p>
                <p>Administrators do not use the citizen booking forms and the assistant is not rendered for them.</p>
              </Card>
              <Card title="Sub-roles: super / reviewer / fines / support" state="ui-only">
                <p><code>src/lib/admin-utils.ts</code> defines an <code>AdminRole</code> type with four roles and a permission matrix
                  (<code>can(role, permission)</code>). The dashboard currently hardcodes <code>const adminRole = "super"</code>,
                  and the database enum has no such values — so every administrator today is effectively a super administrator.
                  The permission layer exists but is not yet driven by data.</p>
              </Card>
              <Card title="Anonymous visitor" state="implemented">
                <p>Can view the landing page, this documentation page and the auth page. No database table grants any privilege to
                  the <code>anon</code> role, so an unauthenticated caller can read nothing.</p>
              </Card>
            </Section>

            {/* 3 */}
            <Section id="architecture" n="3" title="Architecture"
              lead="RoadReady is a TanStack Start (React 19) application that talks directly to a managed Postgres Data API. There is no custom application server tier between the browser and the database.">
              <Diagram label="Actual RoadReady architecture as implemented">{`                          ROADREADY
                              │
        ┌─────────────────────┴─────────────────────┐
        │                                           │
  CITIZEN VIEWS                              ADMIN VIEWS
  components/dashboard/citizen.tsx           components/dashboard/admin.tsx
  + traffic-assistant.tsx                    + admin-utils.ts (RBAC helpers)
        │                                           │
        └─────────────────────┬─────────────────────┘
                              │  same route: /_authenticated/dashboard
                              │  branch on isAdmin (user_roles lookup)
                              ▼
                    ROUTING + ROUTE GUARD
        TanStack Router file routes (src/routes)
        /_authenticated/route.tsx  ssr:false, beforeLoad → getUser()
                              │
                              ▼
                      AUTHENTICATION
        Supabase Auth (GoTrue) · email+password · Google OAuth
        JWT access token in localStorage, auto-refreshed
                              │
                              ▼
                  DATA ACCESS (browser client)
        @supabase/supabase-js  →  HTTPS  →  PostgREST Data API
        every request carries the user's bearer JWT
                              │
                              ▼
              POSTGRES + ROW LEVEL SECURITY
        ┌───────────┬───────────┬─────────┬──────────┐
        │ bookings  │ vehicles  │  fines  │ payments │
        └───────────┴───────────┴─────────┴──────────┘
             profiles · user_roles · private.has_role()
                              │
                              ▼
        DERIVED LAYER (client-side, no tables)
        notifications  ·  audit trail  ·  documents  ·  tasks
        lib/dashboard-utils.ts  ·  lib/admin-utils.ts`}</Diagram>

              <Table
                head={["Component", "Technology", "What it does"]}
                rows={[
                  ["Frontend framework", "React 19 + TanStack Start v1, Vite 7", "Renders all UI; file-based routes under src/routes."],
                  ["Routing", "TanStack Router", "Generates routeTree.gen.ts; guards the /_authenticated subtree."],
                  ["Styling", "Tailwind CSS v4 + shadcn/ui + lucide-react", "Semantic design tokens in src/styles.css (road / warning / success / destructive)."],
                  ["Backend", "Supabase auto-generated REST API (PostgREST)", "There are no custom server functions or edge functions in this app; the browser queries tables directly."],
                  ["Database", "PostgreSQL (managed)", "Six tables, five enums, two trigger functions, RLS on everything."],
                  ["Authentication", "Supabase Auth (GoTrue)", "Password and Google OAuth; issues JWTs; email confirmation is disabled."],
                  ["Session storage", "Browser localStorage", "persistSession + autoRefreshToken in src/integrations/supabase/client.ts."],
                  ["Server runtime", "Cloudflare Worker (SSR of public routes)", "Serves the landing, auth and docs pages; the dashboard subtree is client-rendered (ssr:false)."],
                  ["Notifications (in-app)", "Derived client-side from record state", "No notifications table; see section 13."],
                  ["Toasts", "sonner", "Transient success/error feedback."],
                  ["Validation", "zod (auth search params) + native HTML form validation", "No shared server-side validation layer."],
                  ["File storage", "None", "No storage buckets exist; documents are references, not uploaded files."],
                ]}
              />
              <Card title="What is deliberately absent" state="implemented">
                <p>No <code>createServerFn</code> handlers, no <code>src/routes/api/*</code> endpoints and no edge functions are used
                  by the application logic. <code>src/start.ts</code> registers a bearer-token attacher and a CSRF middleware for
                  server functions, but no server functions currently exist — so all authorization is enforced by Postgres RLS
                  rather than by application middleware.</p>
              </Card>
            </Section>

            {/* 4 */}
            <Section id="citizen-workflow" n="4" title="Citizen Workflow"
              lead="Tracing a learner's-test booking from sign-in to outcome, step by step, against the real code.">
              <Diagram label="Citizen booking journey">{`Citizen opens /auth
      ↓  supabase.auth.signInWithPassword()  (or Google via lovable.auth)
Session stored in localStorage
      ↓  navigate to /dashboard
Route guard _authenticated/route.tsx → supabase.auth.getUser()
      ↓  loadData(): profiles, user_roles, bookings, vehicles, fines
Dashboard renders CITIZEN view (isAdmin === false)
      ↓  "Traffic services" → booking form
Frontend checks: driver's test requires learners_number on profile
      ↓  supabase.from("bookings").insert({...})
RLS check: user_id = auth.uid() AND status = 'pending'
      ↓  row created with status 'pending'
toast "Booking submitted for approval" → view switches to Applications
      ↓  administrator decides (section 5)
UPDATE bookings SET status = 'approved' | 'rejected' | 'passed' | 'failed'
      ↓  citizen reloads / revisits dashboard
Derived notice + progress tracker + "next step" text update`}</Diagram>

              <Expand summary="Step detail: what the user sees, what handles it, what changes in the database">
                <Table
                  head={["Step", "User sees", "Frontend", "Backend operation", "Database effect"]}
                  rows={[
                    ["Sign in", "Split-screen auth page, password toggle, Google button", "src/routes/auth.tsx", "supabase.auth.signInWithPassword / OAuth", "No app table written; auth session issued"],
                    ["Register", "Same page in register mode; full name required", "src/routes/auth.tsx", "auth.signUp then profiles.insert", "auth user + profiles row; trigger inserts user_roles 'user'"],
                    ["Guard", "Brief client-side check, redirect to /auth if no session", "_authenticated/route.tsx", "supabase.auth.getUser()", "None"],
                    ["Dashboard load", "Loading state, then summary cards", "dashboard.tsx loadData()", "5 parallel SELECTs", "None (read only)"],
                    ["Select service", "Traffic services cards + form", "ServicesSection (citizen.tsx)", "None yet", "None"],
                    ["Submit booking", "Toast confirmation, redirected to Applications", "book() in dashboard.tsx", "INSERT into bookings", "New row, status 'pending', created_at/updated_at set"],
                    ["Track status", "Progress tracker: Submitted → Verification → Processing → Outcome → Completed", "ApplicationsSection + applicationStage()", "SELECT own bookings", "None"],
                    ["Outcome", "Status badge, plain-language message, next step", "statusInfo() / nextStep()", "Reads the admin-updated row", "Row already updated by admin"],
                  ]}
                />
                <p><strong>Important:</strong> the dashboard fetches once per mount and after each mutation. There is no realtime
                  subscription and no polling, so a citizen sees an administrator's decision on their next load or refresh.</p>
              </Expand>

              <Card title="Vehicle registration path" state="implemented">
                <p>Identical shape: the citizen submits plate, VIN, make, model, year and colour; the row is inserted with
                  <code> registration_status = 'pending'</code> (enforced by the insert policy); an administrator later sets it to
                  <code> verified</code> or <code>rejected</code> and may record a document reference used as the disc reference.</p>
              </Card>
            </Section>

            {/* 5 */}
            <Section id="admin-workflow" n="5" title="Administrator Workflow">
              <Diagram label="Administrator review journey">{`Administrator signs in at /auth (same form as citizens)
      ↓
Route guard confirms a session exists
      ↓
loadData() also queries user_roles → role 'admin' found → isAdmin = true
      ↓
Admin navigation + admin views render (AdminViews router in dashboard.tsx)
      ↓
Overview: metric cards, monthly trends, deriveAdminTasks() priority queue
      ↓
Applications → filter pending → open ApplicationReview dialog
      ↓
Reviewer sees citizen profile fields, service, department, preferred date, timeline
      ↓
Approve / Reject (reason required) / Mark passed / Mark failed
      ↓
supabase.from("bookings").update({ status, admin_notes })
      ↓
RLS: private.has_role(auth.uid(), 'admin') must be true
      ↓
Row updated; bookings_updated_at trigger refreshes updated_at
      ↓
loadData() re-runs → admin list refreshes immediately
      ↓
Citizen sees the new status + derived notice on their next dashboard load`}</Diagram>

              <Card title="What the reviewer actually reviews" state="partial">
                <p>The review dialog shows the citizen's profile record, the requested service, the traffic department, the
                  preferred date and a derived timeline. There is no document upload in the system, so “review documents” means
                  reviewing the submitted field values and any recorded document reference — not inspecting scanned files.</p>
              </Card>
              <Card title="Request further information" state="recommended">
                <p>Only approve/reject/pass/fail exist. A “request information” state would need a new value in the
                  <code> application_status</code> enum and a citizen-facing response form.</p>
              </Card>
              <Card title="Vehicles, fines, appointments, documents, audit" state="implemented">
                <p>Vehicle verification is a plate-first list with a confirmation step writing <code>registration_status</code> and
                  optional <code>admin_notes</code>. Fines views filter the same <code>fines</code> rows by outstanding / payments /
                  history. Appointments are buckets computed from approved bookings by date. Documents are derived from approved
                  applications and verified vehicles. The audit view is reconstructed, not stored — see section 13.</p>
              </Card>
            </Section>

            {/* 6 */}
            <Section id="lifecycle" n="6" title="Application Lifecycle"
              lead="The database enum application_status defines exactly six values. No other status exists.">
              <Diagram label="bookings.status transitions as implemented">{`               [citizen INSERT]
                       │
                       ▼
                   pending  ──────────────┐
             (UI label: "Under review")   │
                       │                  │ citizen may cancel
        ┌──────────────┴───────┐          ▼
        ▼                      ▼      cancelled
    approved                rejected
   (appointment)          (terminal)
        │
   ┌────┴────┐
   ▼         ▼
 passed    failed
(terminal) (terminal)`}</Diagram>

              <Table
                head={["Status", "Set by", "UI label / tone", "Citizen next step"]}
                rows={[
                  ["pending", "Citizen (insert policy forces it)", "Under review — progress", "Wait for verification"],
                  ["approved", "Administrator only", "Approved — positive", "Attend your appointment"],
                  ["rejected", "Administrator only (reason required in UI)", "Rejected — critical", "Book a new test"],
                  ["passed", "Administrator only", "Passed — positive", "Collect your licence"],
                  ["failed", "Administrator only", "Not passed — critical", "Book a new test"],
                  ["cancelled", "Citizen, only while pending", "Cancelled — neutral", "No action needed"],
                ]}
              />
              <Card title="Where status lives and who may change it" state="implemented">
                <p>Status is a single column on <code>public.bookings</code>. The insert policy pins new rows to <code>pending</code>.
                  The citizen update policy allows a transition only from <code>pending</code> to <code>pending</code> or
                  <code> cancelled</code>. Every other transition requires the admin policy. This is enforced in Postgres, so a
                  citizen cannot self-approve even by calling the API directly.</p>
              </Card>
              <Card title="Do status changes send notifications?" state="partial">
                <p>No message is sent and no notification row is written. The change becomes visible because the citizen's
                  dashboard re-derives an in-app notice from the row's status and <code>updated_at</code> on the next load. There is
                  no email or SMS notification anywhere in the codebase.</p>
              </Card>
            </Section>

            {/* 7 */}
            <Section id="database" n="7" title="Database">
              <Diagram label="ERD (public schema; auth.users is managed by the auth service)">{`auth.users (managed)
     │ id
     │ 1:1
     ▼
profiles ──────────────────────────────┐
  id (PK, = auth user id)              │
  email, full_name                     │ 1:N
  id_number, phone                     │
  learners_number, learners_expiry     ├──► bookings
  drivers_number, drivers_expiry       │      id (PK)
  created_at, updated_at               │      user_id
     │                                 │      booking_type   (learners|drivers)
     │ 1:N                             │      preferred_date, traffic_department
     ▼                                 │      status         (application_status)
user_roles                             │      appointment_date, admin_notes
  id (PK)                              │
  user_id                              ├──► vehicles
  role (app_role: user|admin)          │      id (PK)
  UNIQUE(user_id, role)                │      user_id
                                       │      number_plate, vin, make, model
                                       │      manufacture_year, color
                                       │      registration_status (vehicle_status)
                                       │      document_reference, admin_notes
                                       │            │
                                       │            │ 0..1 (FK vehicle_id)
                                       │            ▼
                                       └──►  fines
                                              id (PK)
                                              user_id, vehicle_id → vehicles.id
                                              reference_number, offence
                                              offence_date, location
                                              amount, due_date
                                              payment_status (payment_status)
                                                    │
                                                    │ 1:N (FK fine_id)
                                                    ▼
                                              payments
                                                id (PK)
                                                user_id, fine_id → fines.id
                                                amount, status
                                                provider, provider_reference
                                                paid_at`}</Diagram>

              <Table
                head={["Table", "Purpose", "Who can read", "Who can write"]}
                rows={[
                  ["profiles", "Citizen identity and licence numbers", "Owner; admins (all)", "Owner (own row); admins"],
                  ["user_roles", "Role grants, separate from profiles by design", "Owner (own roles); admins (all)", "Nobody via API — insert/update/delete denied; only the SECURITY DEFINER trigger writes"],
                  ["bookings", "Licence test applications", "Owner; admins", "Owner (create pending / cancel own pending); admins (all)"],
                  ["vehicles", "Vehicle registration records", "Owner; admins", "Owner (create/update while pending); admins (all)"],
                  ["fines", "Traffic fine register", "Owner; admins", "Admins"],
                  ["payments", "Payment attempts against a fine", "Owner; admins", "Owner may insert a pending payment; admins (all)"],
                ]}
              />
              <Expand summary="Enums, triggers and derived (table-less) entities">
                <p><strong>Enums:</strong> <code>app_role</code> (admin, user); <code>application_status</code> (pending, approved,
                  rejected, passed, failed, cancelled); <code>booking_type</code> (learners, drivers); <code>payment_status</code>
                  (unpaid, pending, paid, failed, refunded); <code>vehicle_status</code> (pending, verified, rejected).</p>
                <p><strong>Triggers:</strong> <code>set_updated_at()</code> before UPDATE on profiles, bookings, vehicles, fines and
                  payments; <code>assign_default_user_role()</code> after INSERT on profiles, which grants the <code>user</code> role
                  to everyone and the <code>admin</code> role to one designated verified email address.</p>
                <p><strong>No tables exist for:</strong> appointments, notifications, documents or audit logs. Each of those is a
                  view computed in the browser from the six real tables — see sections 11–13.</p>
              </Expand>
              <Card title="Fines grants are wider than the policies need" state="partial">
                <p>The migration grants INSERT, UPDATE and DELETE on <code>public.fines</code> to <code>authenticated</code>. RLS still
                  blocks non-admin writes because no citizen write policy exists, so the effective behaviour is correct, but the
                  grant is broader than necessary and should be narrowed to SELECT for defence in depth.</p>
              </Card>
            </Section>

            {/* 8 */}
            <Section id="authentication" n="8" title="Authentication">
              <Table
                head={["Concern", "Implementation", "Status"]}
                rows={[
                  ["Registration", "supabase.auth.signUp(email, password) then an explicit profiles INSERT from the client", <Tag key="a" state="implemented" />],
                  ["Login", "supabase.auth.signInWithPassword", <Tag key="b" state="implemented" />],
                  ["Google sign-in", "lovable.auth.signInWithOAuth('google') with a same-origin redirect back to /auth", <Tag key="c" state="implemented" />],
                  ["Password handling", "Never touched by app code; hashed and stored by the auth service", <Tag key="d" state="implemented" />],
                  ["Email confirmation", "Disabled (auto-confirm) at the user's request, so accounts are usable immediately", <Tag key="e" state="partial" />],
                  ["Session", "JWT access + refresh token in localStorage; autoRefreshToken enabled", <Tag key="f" state="implemented" />],
                  ["Session validation", "Route guard calls auth.getUser(), which revalidates with the auth server", <Tag key="g" state="implemented" />],
                  ["Password reset", "resetPasswordForEmail from the Security section", <Tag key="h" state="implemented" />],
                  ["Sign out / sign out everywhere", "auth.signOut(), optionally scope 'global', then replace-navigate to /auth", <Tag key="i" state="implemented" />],
                  ["Multi-factor authentication", "Not present", <Tag key="j" state="recommended" />],
                ]}
              />
              <Card title="Authentication vs authorization in RoadReady" state="implemented">
                <p><strong>Authentication — “who are you?”</strong> The auth service verifies the password or Google identity and
                  issues a signed JWT containing the user id. Every subsequent database request carries that token.</p>
                <p><strong>Authorization — “what may you do?”</strong> Postgres reads <code>auth.uid()</code> from that token and
                  evaluates the RLS policy on each row. The role check goes through <code>private.has_role()</code>, a
                  <code> SECURITY DEFINER</code> function that reads <code>user_roles</code> without triggering policy recursion, and is
                  revoked from <code>PUBLIC</code> and <code>anon</code>.</p>
              </Card>
              <Card title="Sensitive information handling" state="partial">
                <p>ID numbers and licence numbers are masked in the UI by <code>maskIdentifier()</code> and revealed only on an
                  explicit action. This is presentation-level masking: the full value is still fetched to the browser, because the
                  select list requests those columns. Column-level protection would require a restricted view or a server function.</p>
              </Card>
            </Section>

            {/* 9 */}
            <Section id="authorization" n="9" title="Authorization &amp; Role-Based Access">
              <Diagram label="Two independent enforcement points">{`Citizen                                Administrator
   │                                        │
   ▼                                        ▼
FRONTEND  isAdmin === false            isAdmin === true
citizenNav + citizen components        adminNav + admin components
   │                                        │
   └──────────────┬─────────────────────────┘
                  │   (cosmetic only — can be faked in devtools)
                  ▼
DATABASE   every request re-checked by Postgres RLS
   user_id = auth.uid()        OR   private.has_role(auth.uid(),'admin')
                  │
                  ▼
        rows returned / write allowed / write rejected`}</Diagram>

              <Card title="Does the backend enforce authorization independently? Yes." state="implemented">
                <p>The <code>isAdmin</code> flag in React only decides which components render. If a citizen forced that flag to
                  true, the admin screens would render but return nothing useful: the profiles list would come back empty, and any
                  attempted status update would be rejected by the policy, because Postgres re-evaluates
                  <code> private.has_role(auth.uid(),'admin')</code> for every statement. Authorization is therefore enforced at the
                  data layer, not by hidden buttons.</p>
              </Card>
              <Card title="Route protection" state="implemented">
                <p><code>src/routes/_authenticated/route.tsx</code> runs <code>beforeLoad</code> with <code>ssr: false</code> and
                  redirects to <code>/auth</code> when there is no user. This protects the UI only; it is a convenience layer on top
                  of RLS, not the security boundary.</p>
              </Card>
              <Card title="No middleware or API-tier authorization" state="partial">
                <p>Because the app has no server functions or API routes of its own, there is no middleware authorization layer.
                  That is acceptable while all access goes through RLS-protected tables, but it means any future privileged
                  operation must be written as a database function or a properly authenticated server function.</p>
              </Card>
              <Card title="Admin sub-role permissions are not enforced" state="ui-only">
                <p>The <code>can(role, permission)</code> matrix is real code, but the role is hardcoded to <code>super</code> and no
                  policy consults it. Treat it as scaffolding for a future least-privilege model.</p>
              </Card>
            </Section>

            {/* 10 */}
            <Section id="data-flow" n="10" title="Data Flow">
              <Diagram label="Example A — booking a test">{`Citizen fills the booking form (ServicesSection)
      ↓  native HTML required/date validation
book() handler: rejects a driver's test with no learners_number  (frontend rule)
      ↓  supabase.from("bookings").insert({ user_id, booking_type,
                                            preferred_date, traffic_department })
      ↓  HTTPS POST /rest/v1/bookings   (apikey + bearer JWT)
Postgres: INSERT policy → user_id = auth.uid() AND status = 'pending'
      ↓  row written, defaults applied (status, created_at, updated_at)
error? → toast.error(error.message)     success? → toast.success + loadData()
      ↓
loadData() re-reads all five datasets → notices re-derived → UI updated`}</Diagram>
              <Diagram label="Example B — administrator approval">{`Administrator clicks Approve in ApplicationReview
      ↓  confirmation step; rejection additionally requires a typed reason
updateBooking(id, status, note)
      ↓  supabase.from("bookings").update({ status, admin_notes }).eq("id", id)
      ↓  HTTPS PATCH /rest/v1/bookings?id=eq.<uuid>
Postgres: UPDATE policy → private.has_role(auth.uid(),'admin')
      ↓  bookings_updated_at trigger sets updated_at = now()
toast + loadData() → admin queue refreshes
      ↓
Citizen's next dashboard load re-reads the row
      ↓  deriveNotices() emits "Application approved" with the new updated_at
      ↓  progress tracker advances; nextStep() text changes`}</Diagram>
              <Card title="Read pattern" state="partial">
                <p>All reads happen in one <code>loadData()</code> function using five parallel queries, held in React state. There
                  is no TanStack Query caching for dashboard data, no pagination and no realtime channel, so admin lists load every
                  row of every table on each refresh. This is fine at demo scale and is the clearest scaling limitation.</p>
              </Card>
            </Section>

            {/* 11 */}
            <Section id="vehicles" n="11" title="Vehicle Management">
              <Diagram label="Ownership chain">{`profiles.id  ──1:N──►  vehicles.user_id
                          vehicles.id  ──0..N──►  fines.vehicle_id

Bookings are NOT linked to vehicles: a licence test belongs to a person,
not to a car. The citizen → vehicle → fine chain is the only vehicle link.`}</Diagram>
              <Card title="Registration and verification" state="implemented">
                <p>The citizen submits number plate, VIN, make, model, year and colour. The insert policy forces
                  <code> registration_status = 'pending'</code> and <code>user_id = auth.uid()</code>, so a vehicle cannot be created
                  pre-verified or under someone else's name. While pending, the owner may still edit the record; once an
                  administrator sets it to <code>verified</code> or <code>rejected</code>, the owner's update policy no longer matches
                  and the record becomes read-only to them.</p>
              </Card>
              <Card title="Retrieval and isolation" state="implemented">
                <p>Citizens read their vehicles through the owner SELECT policy; administrators read all vehicles through the admin
                  policy. There is no public or anon access, so plate lookup is impossible for an unauthenticated caller.</p>
              </Card>
              <Card title="Disc reference" state="partial">
                <p><code>document_reference</code> is a free-text field an administrator can set, surfaced to the citizen in the
                  Documents view as a disc reference. It is a record, not a generated or printable licence disc.</p>
              </Card>
            </Section>

            {/* 12 */}
            <Section id="fines" n="12" title="Fines &amp; Payments">
              <Card title="Fine record vs payment record" state="implemented">
                <p>These are two distinct tables. A <strong>fine</strong> (<code>fines</code>) is the offence itself: reference number,
                  offence description, date, location, amount, due date and a <code>payment_status</code>. A <strong>payment</strong>
                  (<code>payments</code>) is an attempt to settle one fine: it references <code>fine_id</code>, carries its own amount
                  and status, and has <code>provider</code>, <code>provider_reference</code> and <code>paid_at</code> columns for a future
                  payment gateway.</p>
              </Card>
              <Card title="How fines are created" state="partial">
                <p>Only administrators (or a service-role process) can insert fines; there is no citizen-facing creation path and
                  no integration with an external enforcement system. In practice fines are seeded through the backend.</p>
              </Card>
              <Card title="Payment flow" state="partial">
                <p>The citizen's Fines view has a confirmation-gated “pay” action that inserts a <code>payments</code> row with status
                  <code> pending</code>, which is all the insert policy permits. No payment provider is connected: no money moves, no
                  <code> paid_at</code> is written, and the fine's own <code>payment_status</code> is not changed by the citizen. A real
                  integration would need a provider plus a signed webhook to mark the fine paid server-side.</p>
              </Card>
              <Card title="Presentation and history" state="implemented">
                <p><code>fineState()</code> derives outstanding / overdue / pending / paid / refunded / failed from
                  <code> payment_status</code> plus the due date. Overdue unpaid fines are promoted into the citizen's “action
                  required” list and the administrator's priority queue with a summed total. Administrators filter the same rows
                  into Outstanding, Payments and History views and can export CSV.</p>
              </Card>
            </Section>

            {/* 13 */}
            <Section id="notifications" n="13" title="Notifications &amp; Audit">
              <Card title="Notifications are derived, not stored" state="partial">
                <p><code>deriveNotices()</code> builds the notification list on every render from the current
                  <code> bookings</code>, <code>vehicles</code> and <code>fines</code> rows: one notice per application status, one per
                  vehicle status change, and one per unpaid fine, sorted by <code>updated_at</code>. There is no notifications table,
                  so nothing is pushed, emailed or queued.</p>
              </Card>
              <Diagram label="Actual notification path">{`Administrator approves an application
      ↓  bookings.status = 'approved', updated_at = now()
      ↓  (no message is sent — nothing happens until the citizen loads)
Citizen loads /dashboard
      ↓  loadData() reads the row
      ↓  deriveNotices() produces "Application approved"
      ↓  unread = notices not present in localStorage read-list
      ↓  bell badge + Notifications view`}</Diagram>
              <Card title="Read / unread state" state="partial">
                <p>Read state lives in <code>localStorage</code> under a per-user key. It is therefore per-browser and per-device: the
                  same notice can appear unread again on another device, and clearing site data resets it.</p>
              </Card>
              <Card title="Audit trail" state="partial">
                <p><code>deriveAuditTrail()</code> reconstructs an activity log from record state — submissions from
                  <code> created_at</code>, decisions from <code>updated_at</code> and current status. It is honest about what it can
                  show, but it is not a real audit log: it cannot say <em>which</em> administrator acted, it shows only the latest
                  state rather than a history, and it can be rewritten by any later update. A dedicated append-only audit table
                  written by database triggers is the single most valuable security improvement available.</p>
              </Card>
            </Section>

            {/* 14 */}
            <Section id="assistant" n="14" title="Traffic Services Assistant">
              <Card title="Not an AI system" state="implemented">
                <p>The assistant in <code>src/components/dashboard/traffic-assistant.tsx</code> is a deterministic rule-based
                  responder. Its <code>answer()</code> function runs a short series of regular expressions over the typed question
                  (plate/vehicle/car, fine/ticket/pay, test/appointment/status, renew/licence, document, help) and returns a
                  sentence built from the citizen's own data. No model, no API call, no external service, and no network request is
                  made when you chat with it.</p>
              </Card>
              <Card title="Where it appears and what it can access" state="implemented">
                <p>It renders as a floating button only for non-admin users, only after data has loaded, on the dashboard. It reads
                  the same in-memory <code>bookings</code>, <code>vehicles</code> and <code>fines</code> arrays the dashboard already
                  fetched under the citizen's own RLS policies — so it can answer “what is my number plate?”, “when is my test?”
                  and “do I owe anything?”, and it structurally cannot reach another person's records.</p>
              </Card>
              <Card title="What it cannot do" state="implemented">
                <p>It cannot look up a plate that is not registered to the signed-in user, cannot perform any write (no booking,
                  cancelling or paying), does not persist conversations, and falls back to a generic capability message for
                  anything outside its six patterns. Quick-action buttons navigate the dashboard; they are not intent recognition.</p>
              </Card>
            </Section>

            {/* 15 */}
            <Section id="api" n="15" title="API / Backend Communication">
              <Diagram label="Request path (no custom application server)">{`React component
      │  supabase-js method call
      ▼
Supabase JS client  — attaches apikey header + user bearer JWT
      │  HTTPS
      ▼
PostgREST Data API  (/rest/v1/<table>)
      │  SQL, executed as role "authenticated" with request.jwt.claims
      ▼
PostgreSQL + RLS policies
      │  rows or permission error
      ▼
{ data, error } returned to the component`}</Diagram>
              <Table
                head={["Operation", "Method", "Input", "Auth", "Database effect / errors"]}
                rows={[
                  ["profiles (self)", "GET", "id = current user", "Session required", "Owner SELECT policy; returns null if no profile row"],
                  ["user_roles (self)", "GET", "user_id = current user", "Session required", "Drives isAdmin; empty result means citizen"],
                  ["bookings", "GET", "ordered by created_at desc", "Session required", "RLS narrows to own rows, or all rows for admins"],
                  ["bookings", "POST", "booking_type, preferred_date, traffic_department", "Session required", "Rejected unless user_id = auth.uid() and status pending"],
                  ["bookings", "PATCH", "status, admin_notes", "Admin role required", "Citizens may only move their own pending row to cancelled"],
                  ["vehicles", "POST", "plate, vin, make, model, year, colour", "Session required", "Forced to pending and to the caller's user_id"],
                  ["vehicles", "PATCH", "registration_status, admin_notes", "Admin role required", "Owner edits allowed only while pending"],
                  ["fines", "GET", "ordered by created_at desc", "Session required", "Own fines, or all fines for admins"],
                  ["payments", "POST", "fine_id, amount", "Session required", "Must be own user_id and status pending"],
                  ["auth (sign up / in / out / reset)", "POST", "credentials", "Public endpoints", "Handled by the auth service, not by app tables"],
                ]}
              />
              <Card title="Keys and secrets" state="implemented">
                <p>The browser only ever carries the publishable key, which is safe to expose precisely because it grants nothing
                  on its own — every privilege comes from the user's JWT evaluated against RLS. The service-role key is never
                  imported by client code. No secret appears in this documentation.</p>
              </Card>
            </Section>

            {/* 16 */}
            <Section id="errors" n="16" title="Error Handling">
              <Table
                head={["Failure", "Where it is caught", "What the user sees"]}
                rows={[
                  ["Invalid login", "auth.tsx reads error.message", "Inline message under the form with role=\"status\""],
                  ["Missing form fields", "Native HTML required / minLength (password ≥ 8)", "Browser validation before any request"],
                  ["Business rule (driver test without learner number)", "book() in dashboard.tsx", "Error toast; nothing is sent"],
                  ["Failed insert/update", "{ error } checked after every mutation", "Error toast; loadData() is not re-run"],
                  ["Any read failure in loadData()", "try/catch sets status = 'error'", "Full-panel ErrorState with a Retry button"],
                  ["Unauthorized data access", "Postgres RLS", "Empty result or a permission error surfaced as an error toast"],
                  ["Expired / missing session", "_authenticated route guard", "Redirect to /auth (token refresh normally prevents this)"],
                  ["Missing records", "Component-level empty states", "Explicit empty-state cards, never a blank screen"],
                  ["Unhandled render error", "Root errorComponent in __root.tsx", "Friendly recovery page with retry and home links"],
                  ["Unknown route", "Root notFoundComponent", "404 page"],
                ]}
              />
              <Card title="Gap: errors are shown, not classified" state="partial">
                <p>Raw provider messages are surfaced in some places (login, booking insert). They are not sensitive, but a mapped
                  set of user-facing messages would be clearer and would avoid leaking implementation vocabulary.</p>
              </Card>
            </Section>

            {/* 17 */}
            <Section id="security" n="17" title="Security Model">
              <Table
                head={["Pillar", "How RoadReady implements it", "Assessment"]}
                rows={[
                  ["Identity", "auth.users id, mirrored as profiles.id; roles held separately in user_roles", "Sound — roles are deliberately not a column on profiles, which prevents privilege escalation via profile update"],
                  ["Authentication", "Password or Google, JWT with refresh, getUser() revalidation in the guard", "Solid; no MFA"],
                  ["Authorization", "Row Level Security on all six tables + SECURITY DEFINER has_role in a private schema", "Strongest part of the system — enforced independently of the UI"],
                  ["Data protection", "TLS in transit; masking of ID and licence numbers in the UI", "Partial — masking is cosmetic, full values reach the browser"],
                  ["Auditability", "Audit view reconstructed from created_at/updated_at/status", "Weak — no actor attribution, no immutable history"],
                  ["Session security", "localStorage tokens, auto-refresh, sign out everywhere (global scope)", "Adequate, but localStorage is readable by any XSS on the origin"],
                ]}
              />
              <Card title="Honest weaknesses" state="partial">
                <p>1. No append-only audit table, so administrative actions cannot be proven after the fact.
                  2. Email confirmation is disabled, so an address is never verified at registration.
                  3. Identifier masking is presentation-only.
                  4. The admin permission matrix is not enforced anywhere — every admin is a super admin.
                  5. Fines carry wider table grants than their policies require.
                  6. Sessions live in localStorage, so a cross-site scripting flaw would expose them.
                  7. Read state and the driver's-licence prerequisite are client-side only.
                  8. No rate limiting or abuse protection on submissions.</p>
                <p className="font-semibold text-foreground">Having authentication and RLS does not make the system fully secure; it
                  makes the data boundary correct. The gaps above are governance and hardening gaps, and they are real.</p>
              </Card>
            </Section>

            {/* 18 */}
            <Section id="researcher" n="18" title="Researcher Summary">
              <Expand summary="What is RoadReady, in one paragraph?">
                <p>RoadReady is a web-based traffic-services portal. Citizens create an account, book learner's or driver's licence
                  tests, register vehicles and view fines issued to them; authorised administrators sign in to the same application
                  and see a review workspace where they approve or reject those submissions, verify vehicles and monitor fines and
                  appointments. The interface is a React application; the backend is a managed PostgreSQL database exposed through
                  an auto-generated REST API, with all access rules enforced by Postgres Row Level Security.</p>
              </Expand>
              <Expand summary="How does a citizen's application reach an administrator, and the decision reach the citizen?">
                <p>The citizen's browser inserts a row into <code>bookings</code> with status <code>pending</code>. Nothing is pushed
                  anywhere. When an administrator loads the dashboard, their admin RLS policy lets the same query return every
                  citizen's rows, so the new submission appears in the pending queue. The administrator patches the row's status
                  and optional notes. Nothing is pushed back either: on the citizen's next dashboard load, the updated row is read
                  and the interface derives a status badge, a progress step and an in-app notice from it.</p>
              </Expand>
              <Expand summary="Where is information stored, and how are vehicles and fines connected to citizens?">
                <p>Everything durable lives in six PostgreSQL tables. <code>profiles.id</code> is the citizen key; <code>bookings</code>,
                  <code> vehicles</code> and <code>fines</code> each hold a <code>user_id</code>; <code>fines.vehicle_id</code> optionally
                  points at a vehicle and <code>payments.fine_id</code> at a fine. Notifications, documents, appointments and the audit
                  view have no storage at all — they are computed in the browser from those tables. Notification read state is the
                  only thing kept in browser storage.</p>
              </Expand>
              <Expand summary="How is sensitive information protected?">
                <p>By the database, primarily. No table grants anything to anonymous callers; every policy is scoped to
                  <code> auth.uid()</code> or to a verified admin role; role membership cannot be written through the API at all. On top
                  of that, the UI masks ID and licence numbers by default. Transport is HTTPS. What is <em>not</em> protected:
                  full identifier values still travel to the authorised user's browser, and administrative actions are not recorded
                  in a tamper-evident log.</p>
              </Expand>
            </Section>

            {/* 19 */}
            <Section id="limitations" n="19" title="Known Limitations">
              <Card title="Functional" state="partial">
                <p>No document upload or storage; no email or SMS notifications; no real payment processing; no “request more
                  information” state; no appointment slot capacity or scheduling engine (appointments are derived from approved
                  bookings); no licence renewal workflow beyond assistant guidance; citizen account suspension appears as an admin
                  filter but has no backing column.</p>
              </Card>
              <Card title="Technical" state="partial">
                <p>Admin views fetch entire tables with no pagination or server-side filtering; no realtime updates, so both sides
                  rely on reloads; dashboard reads are held in component state rather than a query cache; notification read state
                  is per-device; the admin permission matrix is inert; the driver's-licence prerequisite is enforced only in the
                  browser.</p>
              </Card>
            </Section>

            {/* 20 */}
            <Section id="improvements" n="20" title="Future Improvements">
              <Card title="Highest value first" state="recommended">
                <p>1. Add an append-only <code>audit_log</code> table written by database triggers, recording actor, action, target
                  and timestamp — this closes the biggest accountability gap.
                  2. Add a real <code>notifications</code> table plus server-side delivery, so read state is durable and decisions
                  reach citizens without a reload.
                  3. Move status transitions and the driver's-licence prerequisite into database functions or constraints so the
                  rules cannot be bypassed by calling the API directly.
                  4. Introduce document storage with a private bucket and owner-scoped access, so reviewers see real evidence.
                  5. Drive the existing admin permission matrix from real role rows and enforce it in policies.
                  6. Add pagination, server-side filtering and realtime subscriptions to the admin queues.
                  7. Integrate a South African payment provider with a signed webhook that marks fines paid server-side.
                  8. Re-enable email verification and add MFA for administrator accounts.
                  9. Narrow the fines table grants to SELECT for authenticated users.</p>
              </Card>
            </Section>

          </div>

          <p className="mt-14 border-t border-border pt-6 text-sm text-muted-foreground">
            This page is documentation only. It reads no data, requires no session, and changes nothing in the running system.
          </p>
        </div>
      </div>
    </main>
  );
}
