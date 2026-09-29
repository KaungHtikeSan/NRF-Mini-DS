"use client";

import { useState } from "react";
import {
  nrfColorCollection,
  nrfColorMetadata,
  nrfColors,
  nrfSpacing,
  nrfTypography,
} from "@/design-system/generated/web/tokens";
import styles from "./catalog.module.css";

const colorEntries = Object.entries(nrfColors);
const typographyEntries = Object.entries(nrfTypography);
const spacingEntries = Object.entries(nrfSpacing);

export default function CatalogPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [platform, setPlatform] = useState<"ios" | "android">("ios");

  async function copy(value: string, name: string) {
    await navigator.clipboard.writeText(value);
    setCopied(name);
  }

  return (
    <main className={styles.catalogShell}>
      <header className={styles.catalogHeader}>
        <p className={styles.eyebrow}>NRF / design system</p>
        <h1 className="nrf-typography-heading">Foundation v0.1</h1>
        <p className={"nrf-typography-body-1-rg " + styles.intro}>
          A generated, platform-independent token source for mobile today and web tomorrow.
        </p>
        <div className={styles.sourceStatus}>
          <span>Figma collection</span>
          <strong>{nrfColorCollection.name}</strong>
          <span>Mode</span>
          <strong data-nrf-mode="mode-1">{nrfColorCollection.mode}</strong>
        </div>
        <div className={styles.downloadArea}>
          <button
            className={"nrf-typography-body-2-md " + styles.downloadTrigger}
            type="button"
            aria-expanded={downloadOpen}
            aria-controls="platform-download"
            onClick={() => setDownloadOpen(!downloadOpen)}
          >
            Download styles
          </button>
          {downloadOpen && (
            <div id="platform-download" className={styles.downloadPicker}>
              <p className="nrf-typography-body-2-md">Choose a platform</p>
              <div className={styles.platformOptions}>
                <label className={styles.platformOption}>
                  <input type="radio" name="platform" value="ios" checked={platform === "ios"} onChange={() => setPlatform("ios")} />
                  <span>iOS · Swift / SwiftUI / UIKit</span>
                </label>
                <label className={styles.platformOption}>
                  <input type="radio" name="platform" value="android" checked={platform === "android"} onChange={() => setPlatform("android")} />
                  <span>Android · Kotlin / Jetpack Compose</span>
                </label>
              </div>
              <a className={"nrf-typography-body-2-md " + styles.downloadFile} href={"/api/tokens/" + platform} download>
                Download {platform === "ios" ? "NRFTokens.swift" : "NRFTokens.kt"}
              </a>
              <p className={"nrf-typography-mini " + styles.downloadNote}>
                Includes generated color, typography, and spacing tokens.
              </p>
            </div>
          )}
        </div>
      </header>

      <CatalogSection eyebrow="01 / color" title="Semantic color tokens">
        <div className={styles.colorGrid}>
          {colorEntries.map(([name, value]) => {
            const metadata = nrfColorMetadata[name as keyof typeof nrfColorMetadata];
            return (
              <button className={styles.colorCard} key={name} onClick={() => copy(value, name)}>
                <span className={styles.swatch} style={{ background: value }} aria-hidden="true" />
                <span className={styles.tokenDetail}>
                  <strong className="nrf-typography-body-2-md">{name}</strong>
                  <span className="nrf-typography-mini">{value}</span>
                  <span className={"nrf-typography-mini " + styles.figmaName}>{metadata.figmaName} · {metadata.figmaToken}</span>
                </span>
              </button>
            );
          })}
        </div>
        <p className={"nrf-typography-mini " + styles.interactionNote} aria-live="polite">
          {copied ? copied + " copied to clipboard." : "Select a token to copy its source value."}
        </p>
      </CatalogSection>

      <CatalogSection eyebrow="02 / typography" title="Seven supplied text styles">
        <div className={styles.typeTable}>
          {typographyEntries.map(([name, style]) => (
            <article className={styles.typeRow} key={name}>
              <p className={styles.typeSample + " nrf-typography-" + style.figmaToken}>Every decision has a name.</p>
              <div className={styles.typeMeta}>
                <strong className="nrf-typography-body-2-md">{name}</strong>
                <span className="nrf-typography-mini">{style.fontFamily} / {style.fontWeight} / {style.fontSize} / {style.lineHeight} / {style.letterSpacing}</span>
                <span className="nrf-typography-mini">{style.figmaName} · {style.figmaToken}</span>
              </div>
            </article>
          ))}
        </div>
      </CatalogSection>

      <CatalogSection eyebrow="03 / spacing" title="4px base scale">
        <div className={styles.spacingList}>
          {spacingEntries.map(([name, value]) => (
            <div className={styles.spacingRow} key={name}>
              <span className="nrf-typography-mini">{name}</span>
              <span className={styles.spaceBar} style={{ width: value }} aria-hidden="true" />
              <span className="nrf-typography-mini">{value}</span>
            </div>
          ))}
        </div>
      </CatalogSection>

      <footer className={"nrf-typography-mini " + styles.catalogFooter}>
        Source tokens → generator → iOS / Android / Web. No components in this release.
      </footer>
    </main>
  );
}

function CatalogSection({ children, eyebrow, title }: Readonly<{ children: React.ReactNode; eyebrow: string; title: string }>) {
  const titleId = title.toLowerCase().replaceAll(" ", "-");
  return (
    <section className={styles.catalogSection} aria-labelledby={titleId}>
      <div className={styles.sectionHeading}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2 id={titleId} className="nrf-typography-body-1-md">{title}</h2>
      </div>
      {children}
    </section>
  );
}
