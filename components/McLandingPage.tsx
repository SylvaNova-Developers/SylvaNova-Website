"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  DISCORD_INVITE_URL,
  MINECRAFT_SERVER_ADDRESS,
  SITE_NAME,
} from "@/lib/constants";
import { useMcServerStatus } from "@/hooks/useMcServerStatus";

export function McLandingPage() {
  const [copied, setCopied] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);
  const { online, playersOnline, playersMax, loaded } = useMcServerStatus();

  const copyServerAddress = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(MINECRAFT_SERVER_ADDRESS);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, []);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) {
      return;
    }

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      return;
    }

    const handleMove = (event: PointerEvent) => {
      const rect = page.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      page.style.setProperty("--mc-parallax-x", `${x * 14}px`);
      page.style.setProperty("--mc-parallax-y", `${y * 10}px`);
    };

    const handleLeave = () => {
      page.style.setProperty("--mc-parallax-x", "0px");
      page.style.setProperty("--mc-parallax-y", "0px");
    };

    page.addEventListener("pointermove", handleMove);
    page.addEventListener("pointerleave", handleLeave);
    return () => {
      page.removeEventListener("pointermove", handleMove);
      page.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  const statusLabel = !loaded
    ? "Checking server…"
    : online
      ? playersMax > 0
        ? `${playersOnline} / ${playersMax} online`
        : `${playersOnline} online`
      : "Server offline";

  return (
    <div className="mc-page" ref={pageRef}>
      <div className="mc-page__bg" aria-hidden />
      <div className="mc-page__overlay" aria-hidden />
      <div className="mc-page__vignette" aria-hidden />

      <div className="mc-page__content">
        <section className="mc-card" aria-labelledby="mc-heading">
          <div className="mc-card__pixel-frame" aria-hidden>
            <span className="mc-pixel-corner mc-pixel-corner--tl" />
            <span className="mc-pixel-corner mc-pixel-corner--tr" />
            <span className="mc-pixel-corner mc-pixel-corner--bl" />
            <span className="mc-pixel-corner mc-pixel-corner--br" />
          </div>

          <div
            className={`mc-status ${online ? "mc-status--online" : loaded ? "mc-status--offline" : "mc-status--pending"}`}
            role="status"
            aria-live="polite"
          >
            <GrassBlockIcon />
            <span className="mc-status__dot" aria-hidden />
            <span className="mc-status__text">{statusLabel}</span>
          </div>

          <header className="mc-hero">
            <p className="mc-hero__eyebrow">{SITE_NAME}</p>
            <h1 id="mc-heading" className="mc-hero__title">
              Minecraft
            </h1>
            <p className="mc-hero__subtitle">
              Adventure, build, and hang out with the grove on our community
              server.
            </p>
          </header>

          <div className="mc-server-block">
            <span className="mc-server-label" id="mc-server-label">
              Server address
            </span>
            <button
              type="button"
              className="mc-address-chip"
              onClick={copyServerAddress}
              aria-labelledby="mc-server-label"
              aria-describedby="mc-copy-hint mc-copy-status"
            >
              <ServerIcon />
              <span className="mc-address-chip__host">
                {MINECRAFT_SERVER_ADDRESS}
              </span>
              <span className="mc-address-chip__icon" aria-hidden>
                {copied ? <CheckIcon /> : <CopyIcon />}
              </span>
            </button>
            <span className="mc-copy-hint" id="mc-copy-hint">
              Tap to copy — no port needed
            </span>
            <p
              className="mc-copy-status"
              id="mc-copy-status"
              role="status"
              aria-live="polite"
            >
              {copied ? "Copied to clipboard!" : ""}
            </p>
          </div>
        </section>

        <div className="mc-actions">
          <a
            href={DISCORD_INVITE_URL}
            className="mc-discord-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            <DiscordIcon />
            Join Discord
          </a>
          <Link href="/" className="mc-back-link">
            <ArrowIcon />
            Back to {SITE_NAME}
          </Link>
        </div>
      </div>
    </div>
  );
}

function CopyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M4 2h7v1H5v8H4V2zm2 2h7v10H6V4zm1 1v8h5V5H7z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M6 11L3 8l1-1 2 2 5-5 1 1-6 6z" />
    </svg>
  );
}

function ServerIcon() {
  return (
    <svg
      className="mc-address-chip__server-icon"
      width="18"
      height="18"
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden
    >
      <path d="M2 3h12v3H2V3zm0 5h12v3H2V8zm2 1h2v1H4V9zm3 0h5v1H7V9z" />
    </svg>
  );
}

function GrassBlockIcon() {
  return (
    <svg
      className="mc-status__icon"
      width="14"
      height="14"
      viewBox="0 0 16 16"
      aria-hidden
    >
      <rect x="1" y="1" width="14" height="14" fill="#3d8528" />
      <rect x="1" y="1" width="14" height="5" fill="#5cb85c" />
      <rect x="3" y="3" width="2" height="2" fill="#4a9e42" />
      <rect x="10" y="2" width="3" height="2" fill="#6cc45c" />
      <rect x="1" y="6" width="14" height="9" fill="#6b5344" />
      <rect x="4" y="9" width="2" height="2" fill="#5a4638" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden>
      <path d="M6 1L5 0 0 5l5 5 1-1-4-4 4-4z" />
    </svg>
  );
}

function DiscordIcon() {
  return (
    <svg
      className="mc-discord-icon"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path
        d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"
      />
    </svg>
  );
}
