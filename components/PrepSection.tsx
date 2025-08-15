import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { 
  Rocket,
  Trophy,
  Crown,
  Lightbulb,
  Brain,
  MessageSquare,
  Award,
  Mail,
  Clock,
  Sparkles,
  ChevronDown,
  Copy,
  CheckCircle
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import {
  standOutStrategies,
  researchPlaybook,
  networkingScripts,
  followUpTemplates,
  timeManagementTips,
  personalBrandBuilder,
  successSecrets
} from '../constants/prepContent';

interface PrepSectionProps {
  completedPrepItems: Set<string>;
  openPrepSections: Set<string>;
  onTogglePrepItem: (itemId: string) => void;
  onTogglePrepSection: (sectionId: string) => void;
  onCopyToClipboard: (text: string) => void;
}

export function PrepSection({ 
  completedPrepItems, 
  openPrepSections, 
  onTogglePrepItem, 
  onTogglePrepSection, 
  onCopyToClipboard 
}: PrepSectionProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="glass border-neon-purple/20 neon-glow">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-3 text-3xl">
            <Rocket className="h-8 w-8 text-neon-purple animate-pulse" />
            <span className="bg-gradient-to-r from-neon-purple via-neon-cyan to-neon-pink bg-clip-text text-transparent">
              Career Fair Domination Guide 
            </span>
            <Rocket className="h-8 w-8 text-neon-pink animate-pulse" />
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The #1 question students ask: <span className="text-neon-cyan font-semibold">"What will make me stand out?"</span> Here's your playbook to go from invisible to unforgettable! 💫
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Prep Progress */}
      <Card className="glass border-neon-cyan/20 neon-glow-cyan">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Trophy className="h-6 w-6 text-neon-cyan" />
              Your Prep Progress
            </h3>
            <div className="text-right">
              <div className="text-2xl font-bold bg-gradient-to-r from-neon-cyan to-neon-green bg-clip-text text-transparent">
                {Math.round((completedPrepItems.size / 15) * 100)}%
              </div>
              <div className="text-sm text-muted-foreground">Complete</div>
            </div>
          </div>
          <div className="w-full h-4 bg-secondary/50 rounded-full">
            <div 
              className="h-4 bg-gradient-to-r from-neon-cyan to-neon-green rounded-full transition-all duration-500 neon-glow-cyan"
              style={{ width: `${Math.round((completedPrepItems.size / 15) * 100)}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            {completedPrepItems.size}/15 items completed • Keep going, you're crushing it! 🔥
          </p>
        </CardContent>
      </Card>

      {/* Success Secrets */}
      <Card className="glass border-neon-yellow/20 neon-glow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Crown className="h-6 w-6 text-neon-yellow" />
            <span className="bg-gradient-to-r from-neon-yellow to-neon-pink bg-clip-text text-transparent">
              Golden Secrets From Top Performers
            </span>
          </CardTitle>
          <CardDescription>
            These insider tips have helped thousands of students land their dream jobs 🌟
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {successSecrets.map((secret) => (
            <div key={secret.id} className="p-4 glass rounded-xl border border-neon-yellow/20 hover:border-neon-yellow/40 transition-colors">
              <h4 className="font-bold text-lg mb-2">{secret.title}</h4>
              <p className="text-muted-foreground">{secret.content}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Stand Out Strategies */}
      <Collapsible open={openPrepSections.has('standout')} onOpenChange={() => onTogglePrepSection('standout')}>
        <Card className="glass border-neon-purple/20">
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-neon-purple/5 transition-colors">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Lightbulb className="h-6 w-6 text-neon-purple" />
                  <span className="bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
                    5 Ways to Stand Out (The Real Ones) 💎
                  </span>
                </div>
                <ChevronDown className={`h-5 w-5 transition-transform ${openPrepSections.has('standout') ? 'rotate-180' : ''}`} />
              </CardTitle>
              <CardDescription>
                Stop blending in with everyone else. These strategies will make recruiters remember YOU.
              </CardDescription>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-6">
              {standOutStrategies.map((strategy) => {
                const IconComponent = strategy.icon;
                return (
                  <div key={strategy.id} className="p-5 glass rounded-xl border border-neon-purple/20">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-gradient-to-r from-neon-purple to-neon-pink rounded-xl flex items-center justify-center">
                          <IconComponent className="h-5 w-5" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-bold text-lg">{strategy.title}</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onTogglePrepItem(strategy.id)}
                            className={`ml-4 ${completedPrepItems.has(strategy.id) ? 'text-neon-green' : 'text-muted-foreground'}`}
                          >
                            {completedPrepItems.has(strategy.id) ? (
                              <CheckCircle className="h-5 w-5 neon-glow" />
                            ) : (
                              <div className="h-5 w-5 rounded-full border-2 border-current" />
                            )}
                          </Button>
                        </div>
                        <p className="text-muted-foreground mb-3">{strategy.description}</p>
                        <div className="p-3 bg-neon-purple/10 rounded-lg border border-neon-purple/20">
                          <p className="text-sm font-medium text-neon-purple mb-1">Example:</p>
                          <p className="text-sm italic">{strategy.example}</p>
                        </div>
                        <Badge className="mt-3 bg-neon-purple/20 text-neon-purple border-neon-purple/30">
                          Action: {strategy.action}
                        </Badge>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Research Playbook */}
      <Collapsible open={openPrepSections.has('research')} onOpenChange={() => onTogglePrepSection('research')}>
        <Card className="glass border-neon-cyan/20">
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-neon-cyan/5 transition-colors">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Brain className="h-6 w-6 text-neon-cyan" />
                  <span className="bg-gradient-to-r from-neon-cyan to-neon-green bg-clip-text text-transparent">
                    Company Research Playbook 🕵️
                  </span>
                </div>
                <ChevronDown className={`h-5 w-5 transition-transform ${openPrepSections.has('research') ? 'rotate-180' : ''}`} />
              </CardTitle>
              <CardDescription>
                The difference between "Do you have any questions?" and "Wow, you really know your stuff!"
              </CardDescription>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-6">
              {researchPlaybook.map((section) => (
                <div key={section.id} className="p-5 glass rounded-xl border border-neon-cyan/20">
                  <h4 className="font-bold text-lg mb-4 text-neon-cyan">{section.title}</h4>
                  <div className="space-y-3">
                    {section.items.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-neon-cyan rounded-full mt-2 flex-shrink-0" />
                        <p className="text-muted-foreground">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Networking Scripts */}
      <Collapsible open={openPrepSections.has('networking')} onOpenChange={() => onTogglePrepSection('networking')}>
        <Card className="glass border-neon-pink/20">
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-neon-pink/5 transition-colors">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-6 w-6 text-neon-pink" />
                  <span className="bg-gradient-to-r from-neon-pink to-neon-yellow bg-clip-text text-transparent">
                    Conversation Scripts That Work 💬
                  </span>
                </div>
                <ChevronDown className={`h-5 w-5 transition-transform ${openPrepSections.has('networking') ? 'rotate-180' : ''}`} />
              </CardTitle>
              <CardDescription>
                No more awkward silences. Here's exactly what to say and when to say it.
              </CardDescription>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-6">
              {networkingScripts.map((script) => (
                <div key={script.id} className="p-5 glass rounded-xl border border-neon-pink/20">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-bold text-lg text-neon-pink">{script.title}</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onCopyToClipboard(script.script)}
                      className="text-neon-pink hover:bg-neon-pink/10"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="p-4 bg-neon-pink/10 rounded-lg border border-neon-pink/20 mb-3">
                    <p className="italic text-sm">{script.script}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <span className="text-neon-pink font-medium">Why it works:</span> {script.why}
                  </p>
                </div>
              ))}
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Personal Brand Builder */}
      <Collapsible open={openPrepSections.has('brand')} onOpenChange={() => onTogglePrepSection('brand')}>
        <Card className="glass border-neon-green/20">
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-neon-green/5 transition-colors">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Award className="h-6 w-6 text-neon-green" />
                  <span className="bg-gradient-to-r from-neon-green to-neon-cyan bg-clip-text text-transparent">
                    Personal Brand Builder 🌟
                  </span>
                </div>
                <ChevronDown className={`h-5 w-5 transition-transform ${openPrepSections.has('brand') ? 'rotate-180' : ''}`} />
              </CardTitle>
              <CardDescription>
                Define what makes you YOU. Your unique story is your biggest competitive advantage.
              </CardDescription>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-6">
              {personalBrandBuilder.map((section) => (
                <div key={section.id} className="p-5 glass rounded-xl border border-neon-green/20">
                  <h4 className="font-bold text-lg mb-4 text-neon-green">{section.title}</h4>
                  {section.questions && (
                    <div className="space-y-3">
                      {section.questions.map((question, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-neon-green rounded-full mt-2 flex-shrink-0" />
                          <p className="text-muted-foreground">{question}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {section.formula && (
                    <div className="space-y-4">
                      <div className="p-3 bg-neon-green/10 rounded-lg border border-neon-green/20">
                        <p className="text-sm font-medium text-neon-green mb-2">Formula:</p>
                        <p className="text-sm">{section.formula}</p>
                      </div>
                      <div className="p-3 bg-secondary/50 rounded-lg">
                        <p className="text-sm font-medium mb-2">Example:</p>
                        <p className="text-sm italic">{section.example}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Follow-up Templates */}
      <Collapsible open={openPrepSections.has('followup')} onOpenChange={() => onTogglePrepSection('followup')}>
        <Card className="glass border-neon-yellow/20">
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-neon-yellow/5 transition-colors">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="h-6 w-6 text-neon-yellow" />
                  <span className="bg-gradient-to-r from-neon-yellow to-neon-pink bg-clip-text text-transparent">
                    Follow-Up Email Templates 📧
                  </span>
                </div>
                <ChevronDown className={`h-5 w-5 transition-transform ${openPrepSections.has('followup') ? 'rotate-180' : ''}`} />
              </CardTitle>
              <CardDescription>
                The career fair doesn't end when you leave. Here's how to stay memorable.
              </CardDescription>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-6">
              {followUpTemplates.map((template) => (
                <div key={template.id} className="p-5 glass rounded-xl border border-neon-yellow/20">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-bold text-lg text-neon-yellow">{template.title}</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onCopyToClipboard(template.template)}
                      className="text-neon-yellow hover:bg-neon-yellow/10"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-neon-yellow mb-1">Subject Line:</p>
                      <p className="text-sm bg-neon-yellow/10 p-2 rounded">{template.subject}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-neon-yellow mb-1">Email Template:</p>
                      <pre className="text-sm bg-secondary/50 p-4 rounded-lg whitespace-pre-wrap">{template.template}</pre>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Time Management */}
      <Collapsible open={openPrepSections.has('time')} onOpenChange={() => onTogglePrepSection('time')}>
        <Card className="glass border-neon-purple/20">
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-neon-purple/5 transition-colors">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock className="h-6 w-6 text-neon-purple" />
                  <span className="bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent">
                    Strategic Time Management ⏰
                  </span>
                </div>
                <ChevronDown className={`h-5 w-5 transition-transform ${openPrepSections.has('time') ? 'rotate-180' : ''}`} />
              </CardTitle>
              <CardDescription>
                Work smarter, not harder. Quality over quantity always wins.
              </CardDescription>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-4">
              {timeManagementTips.map((tip) => (
                <div key={tip.id} className="p-5 glass rounded-xl border border-neon-purple/20">
                  <h4 className="font-bold text-lg mb-2 text-neon-purple">{tip.title}</h4>
                  <p className="text-muted-foreground mb-3">{tip.description}</p>
                  <div className="p-3 bg-neon-purple/10 rounded-lg border border-neon-purple/20">
                    <p className="text-sm font-medium text-neon-purple mb-1">Pro Tip:</p>
                    <p className="text-sm">{tip.tip}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Final Motivation */}
      <Card className="glass border-neon-pink/20 neon-glow-pink">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-neon-pink to-neon-yellow rounded-full flex items-center justify-center neon-glow-pink">
              <Rocket className="h-8 w-8 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-neon-pink to-neon-yellow bg-clip-text text-transparent">
            You've Got This! 🚀
          </h3>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
            Remember: Recruiters meet hundreds of students. Your job isn't to be perfect—it's to be <span className="text-neon-pink font-semibold">memorable</span>. 
            Be genuine, be curious, and let your passion shine through. The right opportunity will recognize your value! ✨
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Badge className="bg-neon-pink/20 text-neon-pink border-neon-pink/30 px-4 py-2 text-base">
              Prep Score: {Math.round((completedPrepItems.size / 15) * 100)}%
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}