# SPEC.md — Project Specification

> **Status**: `FINALIZED`

## Vision

A lightweight, purpose-built Chrome extension that tracks email opens and clicks natively within Gmail, logging data to Firebase Firestore and displaying insights in an in-Gmail React dashboard.

## Goals

1. Track email opens using an embedded tracking pixel.
2. Track link clicks within sent emails.
3. Display open and click activity in a React-based dashboard embedded directly within the Gmail UI.
4. Provide a simple and reliable tracking solution for personal use and close friends/family.

## Non-Goals (Out of Scope)

- Support for webmail clients other than Gmail (e.g., Outlook, Yahoo).
- Monetization or enterprise team features.
- Strict data privacy or compliance tooling beyond basic security (intended for personal use).

## Users

Personal use, with secondary potential for friends and family.

## Constraints

- Must operate exclusively within the Gmail DOM and Chrome Extension MV3 constraints.
- Data must be stored in Firebase Firestore.

## Success Criteria

- [ ] Email sent from Gmail successfully includes a tracking pixel and rewritten links.
- [ ] Tracking pixel load registers an "open" event in Firestore.
- [ ] Clicked link registers a "click" event in Firestore and redirects correctly.
- [ ] React dashboard inside Gmail correctly fetches and displays tracking data from Firestore.
