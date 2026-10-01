import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { ReactElement } from 'react';
import { TopicPage } from '@/components/topic-page';
import { getTopic, topics } from '@/lib/topics';
import '../topics.css';

type TopicPageProps = Readonly<{ params: Promise<{ slug: string }> }>;

export const dynamicParams = false;

export function generateStaticParams(): Array<{ slug: string }> {
  return topics.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({ params }: TopicPageProps): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic) notFound();
  return { title: `${topic.eyebrow} — Chuyên đề ${topic.index}`, description: topic.lead };
}

export default async function Page({ params }: TopicPageProps): Promise<ReactElement> {
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic) notFound();
  const nextTopic = getTopic(topic.nextSlug);
  if (!nextTopic) throw new Error(`Topic ${topic.slug} requires next topic ${topic.nextSlug}.`);
  return <TopicPage topic={topic} nextTopic={nextTopic} />;
}
