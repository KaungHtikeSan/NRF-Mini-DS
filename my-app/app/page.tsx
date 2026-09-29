"use client";

import { useState } from "react";
import {
  nrfColorCollection,
  nrfColorMetadata,
  nrfColors,
  nrfSpacing,
  nrfTypography,
} from "@/design-system/generated/web/tokens";

const colorEntries = Object.entries(nrfColors);
const typographyEntries = Object.entries(nrfTypography);
const spacingEntries = Object.entries(nrfSpacing);

export default function Home() {
  const [copied, setCopied] = useState<string | null>(null);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [platform, setPlatform] = useState<"ios" | "android">("ios");

  async function copy(value: string, name: string) {
    await navigator.clipboard.writeText(value);
    setCopied(name);
  }

  return (
    <main className="catalog-shell">
      <header className="catalog-header">
        <p className="eyebrow">NRF / design system</p>
        <h1 className="nrf-typography-heading">Foundation v0.1</h1>
        <p className="nrf-typography-body-1-rg intro">
          A generated, platform-independent token source for mobile today and web tomorrow.
        </p>
        <div className="source-status">
          <span>Figma collection</span>
          <strong>{nrfColorCollection.name}</strong>
          <span>Mode</span>
          <strong data-nrf-mode="mode-1">{nrfColorCollection.mode}</strong>
        </div>
        <div className="download-area">
          <button
            className="download-trigger nrf-typography-body-2-md"
            type="button"
            aria-expanded={downloadOpen}
            aria-controls="platform-download"
            onClick={() => setDownloadOpen(!downloadOpen)}
          >
            Download styles
          </button>
          {downloadOpen && (
            <div id="platform-download" className="download-picker">
              <p className="nrf-typography-body-2-md">Choose a platform</p>
              <div className="platform-options">
                <label className="platform-option">
                  <input
                    type="radio"
                    name="platform"
                    value="ios"
                    checked={platform === "ios"}
                    onChange={() => setPlatform("ios")}
                  />
                  <span>iOS · Swift / SwiftUI / UIKit</span>
                </label>
                <label className="platform-option">
                  <input
                    type="radio"
                    name="platform"
                    value="android"
                    checked={platform === "android"}
                    onChange={() => setPlatform("android")}
                  />
                  <span>Android · Kotlin / Jetpack Compose</span>
                </label>
              </div>
              <a
                className="download-file nrf-typography-body-2-md"
                href={"/api/tokens/" + platform}
                download
              >
                Download {platform === "ios" ? "NRFTokens.swift" : "NRFTokens.kt"}
              </a>
              <p className="nrf-typography-mini download-note">
                Includes generated color, typography, and spacing tokens.
              </p>
            </div>
          )}
        </div>
      </header>

      <section aria-labelledby="colors-title">
        <div className="section-heading">
          <p className="eyebrow">01 / color</p>
          <h2 id="colors-title" className="nrf-typography-body-1-md">Semantic color tokens</h2>
        </div>
        <div className="color-grid">
          {colorEntries.map(([name, value]) => {
            const metadata = nrfColorMetadata[name as keyof typeof nrfColorMetadata];
            return (
              <button className="color-card" key={name} onClick={() => copy(value, name)}>
                <span className="swatch" style={{ background: value }} aria-hidden="true" />
                <span className="token-detail">
                  <strong className="nrf-typography-body-2-md">{name}</strong>
                  <span className="nrf-typography-mini">{value}</span>
                  <span className="nrf-typography-mini figma-name">{metadata.figmaName} · {metadata.figmaToken}</span>
                </span>
              </button>
            );
          })}
        </div>
        <p className="nrf-typography-mini interaction-note" aria-live="polite">
          {copied ? copied + " copied to clipboard." : "Select a token to copy its source value."}
        </p>
      </section>

      <section aria-labelledby="type-title">
        <div className="section-heading">
          <p className="eyebrow">02 / typography</p>
          <h2 id="type-title" className="nrf-typography-body-1-md">Seven supplied text styles</h2>
        </div>
        <div className="type-table">
          {typographyEntries.map(([name, style]) => (
            <article className="type-row" key={name}>
              <p className={"type-sample nrf-typography-" + style.figmaToken}>Every decision has a name.</p>
              <div className="type-meta">
                <strong className="nrf-typography-body-2-md">{name}</strong>
                <span className="nrf-typography-mini">{style.fontFamily} / {style.fontWeight} / {style.fontSize} / {style.lineHeight} / {style.letterSpacing}</span>
                <span className="nrf-typography-mini">{style.figmaName} · {style.figmaToken}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="spacing-title">
        <div className="section-heading">
          <p className="eyebrow">03 / spacing</p>
          <h2 id="spacing-title" className="nrf-typography-body-1-md">4px base scale</h2>
        </div>
        <div className="spacing-list">
          {spacingEntries.map(([name, value]) => (
            <div className="spacing-row" key={name}>
              <span className="nrf-typography-mini">{name}</span>
              <span className="space-bar" style={{ width: value }} aria-hidden="true" />
              <span className="nrf-typography-mini">{value}</span>
            </div>
          ))}
        </div>
      </section>

      <footer className="catalog-footer nrf-typography-mini">
        Source tokens → generator → iOS / Android / Web. No components in this release.
      </footer>
    </main>
  );
}
